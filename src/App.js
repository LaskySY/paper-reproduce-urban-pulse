import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import './App.css'

import nycCSV from './data/flickr_nyc.csv'
import sfCSV from './data/flickr_sf.csv'
import Map from './components/Map'
import Banner from './components/Banner'
import Scatterplot from './components/Scatterplot';
import PulseChart from './components/PulseChart';


var nycScalarData = []
var sfScalarData = []

function App() {
  const [isCSVLoading, setIsCSVLoading] = useState(true)
  useEffect(() => {
    Promise.all([
      d3.csv(nycCSV, d => [+d.Longtitude, +d.Latitude]),
      d3.csv(sfCSV, d => [+d.Longtitude, +d.Latitude])
    ]).then(files => {
      nycScalarData = files[0]
      sfScalarData = files[1]
      setIsCSVLoading(false)
    })
  }, [])

  return (
    !isCSVLoading &&
    <div className="App">
      <div className='banner_container'>
        <Banner />
      </div>
      <div className='map_container map_container_1'>
        <Map location='nyc' scalarData={nycScalarData} />
      </div>
      <div className='map_container map_container_2'>
        <Map location='sf' scalarData={sfScalarData} />
      </div>
      <div className='scatter_container scatter_container_1'>
        <Scatterplot />
      </div>
      <div className='scatter_container scatter_container_2'>

      </div>
      <div className="pulsechart_container">
        <PulseChart />
      </div>
    </div>
  );
}

export default App;
