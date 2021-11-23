import React, { useEffect } from 'react'
import Plot from 'react-plotly.js';
import { useDispatch, useSelector } from 'react-redux';

import { MODE_MAPPING } from './constant';
import { setMode } from '../store/statusSlicer'
import { setHighlight } from '../store/dataSlicer'


const Scatterplot = ({nycScatterData, sfScatterData}) => {
  const dispatch = useDispatch()
  const dateType = useSelector(state => state.status.type)
  const highLightPointKey = useSelector(state=> 
    state.status.mode === MODE_MAPPING.NORMAL
      ? state.data.singleHighlight
      : -1
  )

  const buildData = data => data.reduce((acc, cur) => {
    let fnRank = cur.resolutions[dateType].fnRank;
    let maxRank = cur.resolutions[dateType].maxRank;
    let sigRank = cur.resolutions[dateType].sigRank;
    let x = Math.sqrt(maxRank * maxRank + fnRank * fnRank + sigRank * sigRank);
    let y = cur.rank;
    acc.x.push(x)
    acc.y.push(y)
    return acc
  }, { x: [], y: [] })

  let nycRank = buildData(nycScatterData)
  let sfRank = buildData(sfScatterData)
  let singleHighlightPoint = [
    ...nycScatterData.filter(d=>d.key === highLightPointKey),
    ...sfScatterData.filter(d=>d.key === highLightPointKey),
  ]
  let singleHightlightCoordinate = buildData(singleHighlightPoint)

  const data = [{
    ...nycRank,
    name: "nyc",
    type: 'scatter',
    mode: 'markers',
    opacity: 0.6,
    marker: { color: 'red' },
  }, {
    ...sfRank,
    name: "sf",
    type: 'scatter',
    mode: 'markers',
    opacity: 0.6,
    marker: { color: 'blue' },
  }, {
    ...singleHightlightCoordinate,
    type: 'scatter',
    mode: 'markers',
    opacity: 1,
    marker: {
      size: 10, 
      color: highLightPointKey >= 96 ? 'blue' : 'red',
      line: { width: 2 }
    },
  }]

  const config = {
    scrollZoom: true,
    displayModeBar: true,
    uirevision: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['zoomIn', 'zoomOut', 'autoScale']
  }

  const layout = {
    width: '300',
    height: '250',
    dragmode: 'select',
    showlegend: false,
    hovermode: false,
    margin: { l: 20, r: 10, b: 20, t: 20, }
  }

  const onSelectedHandler = data => {
    if(!data) return
    if(!data.points.length){
      dispatch(setHighlight({ nycHighlight: [], sfHighlight: [] }))
    }
    let nycHighlight = []
    let sfHighlight = []
    let lastIndex = data.points.length - 1

    if(data.points[0].data.name === 'nyc'){
      nycHighlight = data.points[0].data.selectedpoints
      if(data.points[lastIndex].data.name === 'sf'){
        sfHighlight = data.points[lastIndex].data.selectedpoints
      }
    } else {
      sfHighlight = data.points[0].data.selectedpoints
      if(data.points[lastIndex].data.name === 'nyc'){
        nycHighlight = data.points[lastIndex].data.selectedpoints
      }
    }
    dispatch(setHighlight({ nycHighlight, sfHighlight }))
    dispatch(setMode(MODE_MAPPING.SELECT))
  }

  const onDeselectHandler = () => {
    dispatch(setMode(MODE_MAPPING.NORMAL))
  }
  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      onSelected={data => onSelectedHandler(data)}
      onDeselect={() => onDeselectHandler()}
    />
  );
}

export default Scatterplot