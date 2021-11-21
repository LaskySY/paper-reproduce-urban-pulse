import React from 'react'
import Plot from 'react-plotly.js'
import { useDispatch, useSelector } from 'react-redux'
// import { setSingleHighlight } from '../store/dataSlicer'
import { MODE_MAPPING, FEATURE_YRANGE_MAPPING } from './constant'

const getBeatTypes = (d, dateType) => {
  var beats = [];
  var maxTime = d.resolutions[dateType]["maxTime"];
  var sigMaxTime = d.resolutions[dateType]["sigMaxTime"];
  for(var i=0; i<maxTime.length; i++) {
      var b = (maxTime[i]?(sigMaxTime[i]?0:1):2);
      beats.push(b);
  }
  return beats;
}

const PulseChart = () => {
  const dispatch = useDispatch()
  const mode = useSelector(state => state.status.mode)
  const dateType = useSelector(state => state.status.type)
  const nyc = useSelector(state => state.data.nyc)
  const sf = useSelector(state => state.data.sf)
  const nycHighlight = useSelector(state => state.data.nycHighlight)
  const sfHighlight = useSelector(state => state.data.sfHighlight)
  var data = []

  if (mode === MODE_MAPPING.SELECT) {
    let nycData = nycHighlight.map(d => nyc[d])
    let sfData = sfHighlight.map(d => sf[d])
    data = [...nycData, ...sfData]
  } else {
    data = [...nyc, ...sf]
  }
  data.sort((a, b) => b.rank - a.rank)

  
  const lineFigure = {
    config: {
      uirevision: true,
      staticPlot: true,
      displayModeBar: false,
    },
    layout: {
      margin: { l: 40, r: 40, b: 10, t: 10 },
      xaxis: {
        showgrid: false,
        showticklabels: false,
        zeroline: false,
      },
      yaxis: {
        ...FEATURE_YRANGE_MAPPING[dateType]
      }
    }
  }
  const circleFigure = {
    config: {
      uirevision: true,
      staticPlot: true,
      displayModeBar: false,
    },
    layout: {
      margin: { l: 0, r: 0, b: 0, t: 0 },
      xaxis: {
        showgrid: false,
        showticklabels: false,
        zeroline: false,
      },
      yaxis: {
        showgrid: false,
        showticklabels: false,
        zeroline: false,
      }
    }
  }
  const createChart = (d, i) => {
    return (
      <div key={i} 
        // onMouseEnter={() => dispatch(setSingleHighlight(d.key))} 
        // onMouseLeave={() => dispatch(setSingleHighlight(-1))}
      >
        <Plot
          data={[{
            y: d.resolutions[dateType].scalars,
            mode: 'lines',
            line: {
              color: d.location === 'nyc' ? "red" : "blue"
            }
          }]}
          config={lineFigure.config}
          layout={lineFigure.layout}
          useResizeHandler={true}
          style ={{width: "100%", height: "80px"}}
        /> 
        <Plot
          data={[{
            y: Array(d.resolutions[dateType].scalars.length).fill(1),
            mode: 'markers',
            type: 'scatter',
            marker: {
              size: 12,
              color: getBeatTypes(d, dateType),
              colorscale: 'Greens',
              line: { width: 1 }
            }
          }]}
          config={circleFigure.config}
          layout={circleFigure.layout}
          useResizeHandler={true}
          style ={{width: "100%", height: "20px"}}
        />
      </div>

    )
  }
  return (
    <React.Fragment>
      {
        data.map((d, i) => {
          return createChart(d, i)
        })
      }
    </React.Fragment>
  );
}

export default PulseChart