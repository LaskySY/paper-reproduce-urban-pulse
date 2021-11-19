import React from 'react'
import './App.css'

import Map from './components/Map'
import Banner from './components/Banner'
import Scatterplot from './components/Scatterplot';
import PulseChart from './components/PulseChart';


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
              <Scatterplot />
            </div>
            <div className='scatter2'>
              scatter 2
            </div>
          </div>
          <div className="pulse">
            <PulseChart/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
