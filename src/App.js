import React from 'react'
import './App.css'

import Map from './components/Map'
import Banner from './components/Banner'
import Scatterplot from './components/Scatterplot';
import PulseChart from './components/PulseChart';


function App() {

  return (
    <div className="App">
      <div className='banner_container'>
        <Banner />
      </div>
      <div className='map_container map_container_1'>
        <Map location='nyc' />
      </div>
      <div className='map_container map_container_2'>
        <Map location='sf' />
      </div>
      <div className='scatter_container scatter_container_1'>
        <Scatterplot />
      </div>
      <div className='scatter_container scatter_container_2'>

      </div>
      <div className="pulsechart_container">
        <PulseChart/>
      </div>
    </div>
  );
}

export default App;
