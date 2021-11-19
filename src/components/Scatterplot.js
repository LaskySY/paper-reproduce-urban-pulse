import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Scatter
} from 'recharts'

const Scatterplot = () => {
  const dispatch = useDispatch()
  const dateType = useSelector(state=> state.status.type)
  const nycData = useSelector(state => state.data.nyc)
  const sfData = useSelector(state => state.data.sf)

  const buildData = data => data.map(d=>{
      let fnRank  = d.resolutions[dateType].fnRank;
      let maxRank = d.resolutions[dateType].maxRank;
      let sigRank = d.resolutions[dateType].sigRank;
      let x = Math.sqrt(maxRank * maxRank + fnRank * fnRank + sigRank * sigRank);
      let y = d.rank;
    return {x, y}
  })

  let nycRank = buildData(nycData)
  let sfRank = buildData(sfData)

  return (
    <ResponsiveContainer width="100%" height='100%'>
        <ScatterChart >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="x" type='number' name="Rank">
            <Label value="Rank" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis dataKey="y" type='number' name="Rank" width={45}>
           <Label value="Rank" angle={-90} position="insideLeft" textAnchor='middle'/>
          </YAxis>
          <Scatter name="NYC" data={nycRank} fill="#8884d8" />
          <Scatter name="SF" data={sfRank} fill="#82ca9d" />
        </ScatterChart> 
      </ResponsiveContainer> 
  )
}

export default Scatterplot