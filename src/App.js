import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import Map from './Map'
import Banner from './Banner'
import './App.css'
import nycD from './data/flickr_nyc.csv'
import sfD from './data/flickr_sf.csv'

function App() {
  const [urlSuffix, setURLSuffix] = useState('')
  const [nycData, setNYCData] = useState([])
  const [sfData, setSFData] = useState([])
  const [map, setMap] = useState('None')

  useEffect(() => {
    d3.csv(nycD, d => [+d.Longtitude, +d.Latitude]).then(d => setNYCData(d))
    d3.csv(sfD, d => [+d.Longtitude, +d.Latitude]).then(d => setSFData(d))
  }, [])

  useEffect(() => {
    console.log(urlSuffix)
  }, [urlSuffix])

  return (
    <div className="App">
      <div className='banner'>
        <Banner
          map={map}
          setMap={setMap}
          fetchData={setURLSuffix}
        />
      </div>
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
              longtitude: -122.458355,
              latitude: 37.792083,
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
  );
}

export default App;
