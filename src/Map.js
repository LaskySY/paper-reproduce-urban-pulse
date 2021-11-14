import React from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { MAP_STYLE, MAPBOX_TOKEN } from './constant'



const Map = ({ data, initialTarget }) => {
  const INITIAL_VIEW_STATE = {
    longitude: initialTarget['longtitude'],
    latitude: initialTarget['latitude'],
    zoom: 10,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
  };

  const layers = [
    new HeatmapLayer({
      data,
      id: 'heatmp-layer',
      pickable: false,
      getPosition: d => d,
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