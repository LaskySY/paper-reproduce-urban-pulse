import React from 'react';
import { useSelector } from 'react-redux';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { MAP_STYLE, MAPBOX_TOKEN, INITIAL_LOCATION, DATETYPE_MAPPING, MODE_MAPPING } from './constant'


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

const Map = ({ location, scalarData, scatterData}) => {
  const status = useSelector(state => state.status)
  const highLightList = useSelector(state => state.data[location + 'Highlight'])
  const highLightPointKey = useSelector(state=> state.data.singleHighlight)
  const INITIAL_VIEW_STATE = {
    longitude: INITIAL_LOCATION[location].longtitude,
    latitude: INITIAL_LOCATION[location].latitude,
    zoom: 10,
  };

  const layers = [
    new HeatmapLayer({
      id: 'heatmp-layer',
      weightsTextureSize: 128,
      data: scalarData.filter(d => getTime(d[2], status.type) === status.date),
      getPosition: d => [d[0], d[1]],
      radiusPixels: 25,
      colorRange: location === 'nyc'
        ? [[255, 255, 178], [254, 217, 118], [254, 178, 76], [253, 141, 60], [240, 59, 32], [189, 0, 38]]
        : [[255, 255, 178], [254, 217, 118], [254, 178, 76], [253, 141, 60], [240, 59, 32], [189, 0, 38]]
      // : [[239,243,255],[198,219,239],[158,202,225],[107,174,214],[49,130,189],[8,81,156]]
    }),
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: status.mode === MODE_MAPPING.SELECT 
        ? highLightList.map(i=>scatterData[i])
        : scatterData.map(d=>d),
      pickable: true,
      stroked: true,
      filled: false,
      radiusScale: 60,
      getLineWidth: d=> {
        return d.key === highLightPointKey ? 120 : 40
      },
      getRadius: d=> {
        return d.key === highLightPointKey ? 10 : 2
      },
      getLineColor: d=> {
        return d.key === highLightPointKey 
          ? location === 'nyc'
            ? [255, 0, 0, 255] 
            : [0, 0, 255, 255] 
          : [0, 0, 0, 255]
      },
      getPosition: d => d.latLng,
    })
  ];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <StaticMap reuseMaps mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}

export default Map