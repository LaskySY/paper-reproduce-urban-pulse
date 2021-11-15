import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import Map from './Map'
import Banner from './Banner'
import './App.css'


function App() {
  const [nycData, setNYCData] = useState([])
  const [sfData, setSFData] = useState([])

  useEffect(() => {
    d3.csv('./data/flickr_nyc.csv', d => [+d.Longtitude, +d.Latitude]).then(d => setNYCData(d))
    d3.csv('./data/flickr_sf.csv', d => [+d.Longtitude, +d.Latitude]).then(d => setSFData(d))
  }, [])

  const reformDataHandler = (timeFormat, timeRange) => {
    console.log(timeFormat, timeRange)
  }

  return (
    <div className="App">
      <div className='banner'>
        <Banner
          reformData={reformDataHandler}
        />
      </div>
      <div className="content">
        <div className="map-container">
          <div className='map'>
            <Map
              data={nycData}
              initialTarget={{
                longtitude: -73.97963,
                latitude: 40.730519
              }}
            />
          </div>
          <div className='map'>
            <Map
              data={sfData}
              initialTarget={{  
                longtitude: -122.3828770,
                latitude: 37.7783487,
              }}
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
