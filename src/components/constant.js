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
  SELECT: 'select',
  LOCATION: 'location'
}

export const DATETYPE_MAPPING = {
  HOUR: 'HOUR',
  DAYOFWEEK: "DAYOFWEEK",
  MONTH: "MONTH"
}

export const AXES_BY_MODE_MAPPING = {
  HOUR: {
    scatterChart: { range: [0, 1.6] },
    pulseChart: { range: [0, 1200], tickvals: [0, 500, 1000] },
    distanceChart: { range: [-0.1, 7.5], tickvals: [0, 1, 2, 3, 4, 5, 6, 7] }
  },
  DAYOFWEEK: {
    scatterChart: { range: [0, 1.8] },
    pulseChart: { range: [0, 3200], tickvals: [1000, 2000, 3000] },
    distanceChart: { range: [-0.1, 4.3], tickvals: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5] }
  },
  MONTH: {
    scatterChart: { range: [0, 1.5] },
    pulseChart: { range: [0, 2200], tickvals: [1000, 2000, 3000] },
    distanceChart: { range: [-0.1, 5.3], tickvals: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5] }
  }
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

export const LOCATION_KEY_MAPPING = {
  'Rockefeller Center': { key: [2], city: 'nyc', name: 'Rockefeller Center' },
  'Greenwich Village': { key: [16, 17, 25, 60, 61, 72, 81], city: 'nyc', name: 'Greenwich Village' },
  'Alcatraz Island': { key: [3], city: 'sf', name: 'Alcatraz Island' },
  'Western Addition': { key: [8, 19, 46, 75, 85, 88], city: 'sf', name: 'Western Addition' }
}