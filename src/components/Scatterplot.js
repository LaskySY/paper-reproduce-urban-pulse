import React from 'react'
import Plot from 'react-plotly.js';
import { useDispatch, useSelector } from 'react-redux';

import { MODE_MAPPING } from './constant';
import { setMode } from '../store/statusSlicer'
import { setHighlight } from '../store/dataSlicer'

const Scatterplot = () => {
  const dispatch = useDispatch()
  const dateType = useSelector(state => state.status.type)
  const nycData = useSelector(state => state.data.nyc)
  const sfData = useSelector(state => state.data.sf)

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

  let nycRank = buildData(nycData)
  let sfRank = buildData(sfData)

  const data = [{
    ...nycRank,
    name: "nyc",
    type: 'scatter',
    mode: 'markers',
    marker: {color: 'red'},
  }, {
    ...sfRank,
    name: "sf",
    type: 'scatter',
    mode: 'markers',
    marker: {color: 'blue'},
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
    if (!data) return
    let nycHighlight = []
    let sfHighlight = []

    data.points.forEach(d => {
      d.data.name === 'nyc'
        ? nycHighlight.push(d.pointIndex)
        : sfHighlight.push(d.pointIndex)
    })
    dispatch(setHighlight({ nycHighlight, sfHighlight }))
    dispatch(setMode(MODE_MAPPING.SELECT))
  }

  const onDeselectHandler = () => {
    dispatch(setMode(MODE_MAPPING.NORMAL))
    dispatch(setHighlight({ nycHighlight: [], sfHighlight: [] }))
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