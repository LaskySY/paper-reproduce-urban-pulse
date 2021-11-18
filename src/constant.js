export const NYC_DATA_URL_PREFIX = 'https://vgc.poly.edu/files/urban-pulse/data/nyc/flickr'
export const SF_DATA_URL_PREFIX = 'https://vgc.poly.edu/files/urban-pulse/data/sf/flickr'
export const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
export const MAPBOX_TOKEN = "pk.eyJ1Ijoic2w5MjAiLCJhIjoiY2txcXhrNWJ1MDNtbjJwbnFud3JwZG9yYyJ9.uA0W5mcPNfvnW9LXC_DQ6A"

export const TIME_MAPPING = {
  'HOUR': [0, 23],
  'DAYOFWEEK': [0, 6],
  'MONTH': [0, 11]
}

export const INITIAL_LOCATION = {
  nyc: {longtitude: -73.963938144, latitude:40.779187935},
  // nyc: {longtitude: -73.97963, latitude: 40.730519},
  sf: {longtitude: -122.423402985, latitude: 37.826668148}
  // sf: {longtitude: -122.38288, latitude: 37.77835}
}