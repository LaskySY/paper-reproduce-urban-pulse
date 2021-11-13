import React, { useState } from 'react'
import Map from './Map'
import './App.css'


function App() {
  const [nycData, setNYCData] = useState()
  const [sfData, setSFData] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="App">
      <div className='banner'>
        banner
      </div>
      <div className='content'>
        <div className="map-container">
          <div className='map'>
            <Map
              id="map1"
              isLoaded
              data={nycData}
            />
          </div>
          <div className='map'>
            <Map
              id='map2'
              isLoaded
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
