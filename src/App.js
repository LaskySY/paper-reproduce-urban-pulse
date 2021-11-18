import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as d3 from 'd3'
import Map from './Map'
import Banner from './Banner'
import './App.css'
import nycCSV from './data/flickr_nyc.csv'
import sfCSV from './data/flickr_sf.csv'

import { getTime } from './util'
import { finishLoading } from './store/statusSlicer'

var nycData = []
var sfData = []

function App() {
  const status = useSelector(state => state.status)
  const dispatch = useDispatch()

  useEffect(() => {
    let csvCallback = d => {
      let time = getTime(+d.Time)
      return [
        d.Longtitude,
        d.Latitude,
        time.Hour,
        time.DOW,
        time.Month
      ]
    }
    Promise.all([
      d3.csv(nycCSV, csvCallback),
      d3.csv(sfCSV, csvCallback)
    ]).then(files => {
      nycData = files[0]
      sfData = files[1]
      dispatch(finishLoading())
    })
  }, [])
  
  return (
    <div className="App">
      <div className='banner'>
        <Banner />
      </div>
      <div className="content">
        <div className="map-container">
          <div className='map'>
            <Map
              location='nyc'
              data={nycData}
            />
          </div>
          <div className='map'>
            <Map
              location='sf'
              data={sfData}
            />
          </div>
        </div>
        <div className='vis'>
          <div className="scatterplot-container">
            <div className='scatter1'>
              scatter 1
            </div>
            <div className='scatter2'>
              scatter 2
            </div>
          </div>
          <div className="pulse">
            pulse
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
