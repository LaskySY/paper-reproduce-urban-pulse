import React from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { MAP_STYLE, MAPBOX_TOKEN } from './constant'

const INITIAL_VIEW_STATE = {
  longitude: -73.75,
  latitude: 40.73,
  zoom: 10,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

const Map = ({ data, isLoaded }) => {
  const layers = [
    new HeatmapLayer({
      data,
      isLoaded,
      id: 'heatmp-layer',
      pickable: false,
      getPosition: d => [d[0], d[1]],
      threshold: 0.03
    })
  ];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={[]}>
      <StaticMap reuseMaps mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}

export default Map