import { createSlice } from "@reduxjs/toolkit";

import feature_nyc from '../data/feature_nyc.json'
import feature_sf from '../data/feature_sf.json'

const dataSlicer = createSlice({
  name: "data",
  initialState: {
    nyc: feature_nyc.features.map((d, i) => ({ ...d, location: 'nyc', key: i})),
    sf: feature_sf.features.map((d, i) => ({ ...d, location: 'sf', key: i + feature_nyc.features.length})),
    nycHighlight: [],
    sfHighlight: [],
    // singleHighlight: -1,
  },
  reducers: {
    setHighlight: (state, action) => {
      state.nycHighlight = action.payload.nycHighlight
      state.sfHighlight = action.payload.sfHighlight
    },
    // setSingleHighlight: (state, action) => { state.singleHighlight = action.payload }
  },
});

export const {
  setHighlight,
  // setSingleHighlight
} = dataSlicer.actions

export default dataSlicer.reducer