import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleHighlight } from '../store/dataSlicer'
import { MODE_MAPPING, AXES_BY_MODE_MAPPING, COLOR_PULSE_MAPPING, DATE_MAPPING } from './constant'

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
      fixedrange: true,
    },
    yaxis: {
      showgrid: false,
      showticklabels: false,
      zeroline: false,
      fixedrange: true,
    }
  }
}

const getBeatTypes = (d, dateType) => {
  var beats = [];
  var maxTime = d.resolutions[dateType]["maxTime"];
  var sigMaxTime = d.resolutions[dateType]["sigMaxTime"];
  for (var i = 0; i < maxTime.length; i++) {
    var b = (maxTime[i] ? (sigMaxTime[i] ? 2 : 1) : 0);
    beats.push(b);
  }
  return beats;
}

const PulseChart = ({ nycScatterData, sfScatterData }) => {
  const dispatch = useDispatch()
  const mode = useSelector(state => state.status.mode)
  const dateType = useSelector(state => state.status.type)
  const nycHighlight = useSelector(state => state.data.nycHighlight)
  const sfHighlight = useSelector(state => state.data.sfHighlight)
  const [rankIndex, setRankIndex] = useState([])
  var data = []

  useEffect(() => {
    setRankIndex([])
  }, [dateType])

  if (mode === MODE_MAPPING.SELECT) {
    nycScatterData = nycHighlight.map(d => nycScatterData[d])
    sfScatterData = sfHighlight.map(d => sfScatterData[d])
  }
  data = [...nycScatterData, ...sfScatterData]
  data.sort((a, b) => b.rank - a.rank)
  if (rankIndex.length != 0) {
    data = data.filter(d => {
      let flag = true
      rankIndex.forEach(i => {
        if (!d.resolutions[dateType]["maxTime"][i] ||
          !d.resolutions[dateType]["sigMaxTime"][i]) {
          flag = false
          return null;
        }
      })
      if (flag) return true
      else return false
    })
  }

  const createChart = (d, i) => {
    return (
      <div key={i}
        onMouseEnter={() => dispatch(setSingleHighlight(d.key))}
        onMouseLeave={() => dispatch(setSingleHighlight(-1))}
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
          layout={{
            ...lineFigure.layout,
            yaxis: {
              ...AXES_BY_MODE_MAPPING[dateType].pulseChart
            }
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "80px" }}
        />
        <Plot
          data={[{
            y: Array(d.resolutions[dateType].scalars.length).fill(1),
            mode: 'markers',
            type: 'scatter',
            marker: {
              size: 12,
              color: getBeatTypes(d, dateType).map(d => COLOR_PULSE_MAPPING[d]),
              line: { width: 1 }
            }
          }]}
          config={circleFigure.config}
          layout={circleFigure.layout}
          useResizeHandler={true}
          style={{ width: "100%", height: "20px" }}
        />
      </div>

    )
  }

  const handleClick = data => {
    if (rankIndex.includes(data.points[0].x)) {
      setRankIndex(rankIndex.filter(d => d != data.points[0].x))
    } else {
      setRankIndex([...rankIndex, data.points[0].x])
    }
  }
  return (
    <React.Fragment>
      <div className='pulsechart_bar'>
        <Plot
          data={[{
            y: Array(DATE_MAPPING[dateType].length).fill(1),
            customdata: DATE_MAPPING[dateType],
            mode: 'markers',
            type: 'scatter',
            hovertemplate: '%{customdata}<extra></extra>',
            marker: {
              size: 12,
              color: Array(DATE_MAPPING[dateType].length).fill(0).map((_, i) => {
                return rankIndex.includes(i) ? COLOR_PULSE_MAPPING[2] : COLOR_PULSE_MAPPING[0]
              }),
              line: { width: 1 }
            }
          }]}
          config={{ ...circleFigure.config, staticPlot: false }}
          layout={{ ...circleFigure.layout, margin: { l: 0, r: 18, b: 0, t: 0 } }}
          useResizeHandler={true}
          style={{ width: "100%", height: "30px" }}
          onClick={d => handleClick(d)}
        />
      </div>
      <div className='pulsechart_content'>
        {
          data.map((d, i) => {
            return createChart(d, i)
          })
        }
      </div>
    </React.Fragment>
  );
}

export default PulseChart