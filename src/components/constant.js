export const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
export const MAPBOX_TOKEN = "pk.eyJ1Ijoic2w5MjAiLCJhIjoiY2txcXhrNWJ1MDNtbjJwbnFud3JwZG9yYyJ9.uA0W5mcPNfvnW9LXC_DQ6A"

export const TIME_RANGE_MAPPING = {
  HOUR: { min: 0, max: 23 },
  DAYOFWEEK: { min: 0, max: 6 },
  MONTH: { min: 0, max: 11 }
}

export const INITIAL_LOCATION = {
  nyc: { longtitude: -73.97963, latitude: 40.730519 },
  sf: { longtitude: -122.43430, latitude: 37.79245 }
}

export const MODE_MAPPING = {
  NORMAL: 'normal',
  SELECT: 'select'
}

export const DATETYPE_MAPPING = {
  HOUR: 'HOUR',
  DOW: "DAYOFWEEK",
  MONTH: "MONTH"
}

export const FEATURE_YRANGE_MAPPING = {
  HOUR: { range: [0, 1200], tickvals: [0, 500, 1000] },
  DAYOFWEEK: { range: [0, 3200], tickvals: [1000, 2000, 3000] },
  MONTH: { range: [0, 2200], tickvals: [1000, 2000, 3000] }
}

export const COLOR_PULSE_MAPPING = [
  'rgb(255, 255, 255)',
  'rgb(169, 223, 191)',
  'rgb(25, 111, 61)',
]

export const DATE_MAPPING = {
  HOUR: [...Array(24).keys()],
  DAYOFWEEK: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  MONTH: ['Jan', 'Fen', "Mar", 'Apr', 'May', 'Jun', 'Jul', 'Aug', "Sep", "Oct", 'Nov', 'Dec']
}