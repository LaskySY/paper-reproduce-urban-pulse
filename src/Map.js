import React from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

import { MAP_STYLE, MAPBOX_TOKEN, INITIAL_LOCATION } from './constant'
import { useSelector } from 'react-redux';


const Map = ({location, data}) => {
  // const data = useSelector(state => state.data[location])
  const status = useSelector(state => state.status)
  if(status.isLoading) return null

  const INITIAL_VIEW_STATE = {
    longitude: INITIAL_LOCATION[location].longtitude,
    latitude: INITIAL_LOCATION[location].latitude,
    zoom: 19,
    pitch: 0,
    bearing: 0
  };
  
  const layers = [
    new HeatmapLayer({
      data,
      id: 'heatmp-layer',
      pickable: false,
      getPosition: d => [+d[0], +d[1]],
      radiusPixels: 20
    })
  ];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <StaticMap reuseMaps mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}

export default Map