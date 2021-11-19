import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import * as d3 from 'd3'

import { MAP_STYLE, MAPBOX_TOKEN, INITIAL_LOCATION, MODE_MAP } from './constant'
import nycCSV from '../data/test.csv'
import sfCSV from '../data/test.csv'

var scalarData = []

const Map = ({ location }) => {
  const mode = useSelector(state=> state.status.mode)
  const highLightList = useSelector(state => state.data[location+'Highlight'])
  const scatterData = useSelector(state => {
    let data = state.data[location]
    return mode === 'normal'
     ? data
     : data.filter((_,i)=>highLightList.includes(i))
  })
  const [isCSVLoading, setIsCSVLoading] = useState(true)

  useEffect(() => {
    let csvCallback = d => [+d.Longtitude, +d.Latitude]
    let data = location === 'nyc' ? nycCSV : sfCSV
    d3.csv(data, csvCallback).then(d => {
      scalarData = d
      setIsCSVLoading(false)
    })
  }, [])

  const INITIAL_VIEW_STATE = {
    longitude: INITIAL_LOCATION[location].longtitude,
    latitude: INITIAL_LOCATION[location].latitude,
    zoom: 10,
  };

  const layers = [
    new HeatmapLayer({
      id: 'heatmp-layer',
      data: scalarData,
      getPosition: d => [d[0], d[1]],
      radiusPixels: 20,
      colorRange: location === 'nyc'
        ? [[255, 255, 178], [254, 217, 118], [254, 178, 76], [253, 141, 60], [240, 59, 32], [189, 0, 38]]
        : [[255, 255, 178], [254, 217, 118], [254, 178, 76], [253, 141, 60], [240, 59, 32], [189, 0, 38]]
      // : [[239,243,255],[198,219,239],[158,202,225],[107,174,214],[49,130,189],[8,81,156]]
    }),
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: scatterData,
      pickable: true,
      stroked: true,
      filled: true,
      radiusScale: 60,
      radiusMinPixels: 2,
      radiusMaxPixels: 20,
      lineWidthMinPixels: 0.5,
      getPosition: d => [d.latLng[0][1], d.latLng[0][0]],
      getFillColor: location === 'nyc' ? [255, 140, 0] : [0, 0, 255]
    })
  ];

  return (
    !isCSVLoading &&
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <StaticMap reuseMaps mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}

export default Map