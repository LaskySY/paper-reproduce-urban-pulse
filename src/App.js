import React from 'react'
import Map from './components/Map'
import Banner from './components/Banner'
import './App.css'

function App() {

  return (
    <div className="App">
      <div className='banner'>
        <Banner />
      </div>
      <div className="content">
        <div className="map-container">
          <div className='map'>
            <Map location='nyc' />
          </div>
          <div className='map'>
            <Map location='sf' />
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
