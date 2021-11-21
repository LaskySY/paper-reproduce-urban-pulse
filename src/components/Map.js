import React from 'react';
import { useSelector } from 'react-redux';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { MAP_STYLE, MAPBOX_TOKEN, INITIAL_LOCATION, DATETYPE_MAPPING } from './constant'


const getTime = (unixTimestamp, dateType) => {
  const date = new Date(unixTimestamp * 1000)
  switch (dateType) {
    case DATETYPE_MAPPING.HOUR:
      return date.getHours()
    case DATETYPE_MAPPING.DOW:
      return date.getDay()
    case DATETYPE_MAPPING.MONTH:
      return date.getMonth()
  }
}

const Map = ({ location, scalarData }) => {
  const status = useSelector(state => state.status)
  const highLightList = useSelector(state => state.data[location + 'Highlight'])
  const scatterData = useSelector(state => {
    let data = state.data[location]
    return status.mode === 'normal'
      ? data
      : data.filter((_, i) => highLightList.includes(i))
  })

  const INITIAL_VIEW_STATE = {
    longitude: INITIAL_LOCATION[location].longtitude,
    latitude: INITIAL_LOCATION[location].latitude,
    zoom: 10,
  };

  const layers = [
    new HeatmapLayer({
      id: 'heatmp-layer',
      data: scalarData.filter(d => getTime(d[2], status.type) === status.date),
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
      radiusMaxPixels: 8,
      lineWidthMinPixels: 0.5,
      getPosition: d => [d.latLng[0][1], d.latLng[0][0]],
      getFillColor: [0, 0, 0, 0]
    })
  ];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <StaticMap reuseMaps mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}

export default Map