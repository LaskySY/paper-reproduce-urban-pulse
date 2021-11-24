import React, { useEffect, useState } from 'react'
import * as d3 from 'd3-fetch'
import './App.css'

import nycCSV from './data/flickr_nyc.csv'
import sfCSV from './data/flickr_sf.csv'
import feature_nyc from './data/feature_nyc.json'
import feature_sf from './data/feature_sf.json'
import Map from './components/Map'
import Banner from './components/Banner'
import Scatterplot from './components/Scatterplot';
import PulseChart from './components/PulseChart';
import DistanceChart from './components/DistanceChart'

var nycScatterData = []
var sfScatterData = []
var nycScalarData = []
var sfScalarData = []

function App() {
  const [isCSVLoading, setIsCSVLoading] = useState(true)
  useEffect(() => {
    nycScatterData = feature_nyc.features.map((d, i) => ({
      ...d,
      latLng: [d.latLng[0][1], d.latLng[0][0]],
      location: 'nyc',
      key: i
    }))
    sfScatterData = feature_sf.features.map((d, i) => ({
      ...d,
      latLng: [d.latLng[0][1], d.latLng[0][0]],
      location: 'sf',
      key: i + feature_nyc.features.length
    }))
    Promise.all([
      d3.csv(nycCSV, d => [+d.Longtitude, +d.Latitude, +d.Time]),
      d3.csv(sfCSV, d => [+d.Longtitude, +d.Latitude, +d.Time])
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
        <Map location='nyc' scalarData={nycScalarData} scatterData={nycScatterData} />
      </div>
      <div className='map_container map_container_2'>
        <Map location='sf' scalarData={sfScalarData} scatterData={sfScatterData} />
      </div>
      <div className='scatter_container'>
        <Scatterplot nycScatterData={nycScatterData} sfScatterData={sfScatterData} />
      </div>
      <div className="button_container">

      </div>
      <div className='distance_container'>
        <DistanceChart nycScatterData={nycScatterData} sfScatterData={sfScatterData}   />
      </div>
      <div className="pulsechart_container">
        <PulseChart nycScatterData={nycScatterData} sfScatterData={sfScatterData} />
      </div>
    </div>
  );
}

export default App;
