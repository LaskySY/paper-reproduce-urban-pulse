import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { AXES_BY_MODE_MAPPING, MODE_MAPPING } from './constant';

const getDistance = (feature1, feature2, dateType) => {
  let distance = 0;
  let beat1 = feature1.resolutions[dateType].maxTime;
  let beat2 = feature2.resolutions[dateType].maxTime;
  let dd = 0;
  for (let i = 0; i < beat1.length; i++) {
    dd += ((beat1[i] - beat2[i]) * (beat1[i] - beat2[i]));
  }
  distance += dd;
  let sbeat1 = feature1.resolutions[dateType].sigMaxTime;
  let sbeat2 = feature2.resolutions[dateType].sigMaxTime;
  dd = 0;
  for (let i = 0; i < sbeat1.length; i++) {
    dd += ((sbeat1[i] - sbeat2[i]) * (sbeat1[i] - sbeat2[i]));
  }
  distance += dd;
  let fbeat1 = feature1.resolutions[dateType].fn;
  let fbeat2 = feature2.resolutions[dateType].fn;
  dd = 0;
  for (let i = 0; i < fbeat1.length; i++) {
    dd += ((fbeat1[i] - fbeat2[i]) * (fbeat1[i] - fbeat2[i]));
  }
  distance += dd;
  return Math.sqrt(distance);
}

const config = {
  staticPlot: true,
  displayModeBar: false,
  uirevision: true,
}

const layout = {
  margin: { l: 20, r: 0, b: 40, t: 0 },
  showlegend: false,
  yaxis: {
    showgrid: false,
    showticklabels: false,
    zeroline: false,
    fixedrange: true,
  }
}

const DistanceChart = ({ nycScatterData, sfScatterData }) => {
  const singleHighlight = useSelector(state => state.data.singleHighlight)
  const highlightIndex = useSelector(state => state.data.singleHighlight < 95
    ? state.data.nycHighlight
    : state.data.sfHighlight)
  const mode = useSelector(state => state.status.mode)
  const dateType = useSelector(state => state.status.type)
  const [highlight, setHighlight] = useState(0)

  useEffect(() => {
    if (singleHighlight != -1) setHighlight(singleHighlight)
  }, [singleHighlight])

  if (highlight < 0) return null;
  if (highlight < 95) {
    var location = 'nyc'
    var sourceData = sfScatterData
    var sourcePoint = nycScatterData.filter(d => d.key === highlight)[0]
  } else {
    var location = 'sf'
    var sourceData = nycScatterData
    var sourcePoint = sfScatterData.filter(d => d.key === highlight)[0]
  }

  if (mode === MODE_MAPPING.SELECT) {
    sourceData = highlightIndex.map(d => sourceData[d])
  }

  var distanceList = sourceData.map(d => {
    return getDistance(sourcePoint, d, dateType)
  })

  const data = [{
    x: [0],
    y: [1],
    type: 'scatter',
    mode: 'markers',
    opacity: 0.8,
    marker: { color: location === 'nyc' ? 'red' : 'blue' },
  }, {
    x: distanceList,
    y: Array(distanceList.length).fill(1),
    type: 'scatter',
    mode: 'markers',
    opacity: 0.8,
    marker: { color: location === 'nyc' ? 'blue' : 'red' },
  }]

  return (
    <React.Fragment>
      <div style={{ textAlign: 'center' }}>Distance</div>
      <Plot
        data={data}
        config={config}
        layout={{
          ...layout,
          xaxis: {
            zeroline: false,
            ...AXES_BY_MODE_MAPPING[dateType].distanceChart
          }
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "125px" }}
      />
    </React.Fragment>
  )
}
export default DistanceChart