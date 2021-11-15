import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { getMarks } from './util.js'


const timeExtent = {
  'HOUR': [0, 23],
  'DAYOFWEEK': [1, 7],
  'MONTH': [1, 12]
}
const Banner = ({ reformData }) => {
  const [timeRange, setTimeRange] = useState([6,18])
  const [timeFormat, setTimeFormat] = useState('HOUR')
  
  const handleTimeRangeChange = newTimeRange => {
    if (newTimeRange === timeRange) return
    reformData(timeFormat, newTimeRange)
  }

  const handleTimeFormatChange = newTimeFormat => {
    if (newTimeFormat === timeFormat || newTimeFormat === null) return
    setTimeRange(timeExtent[newTimeFormat])
    setTimeFormat(newTimeFormat)
    reformData(newTimeFormat, timeRange)
  }

  return (
    <Stack
      direction="row"
      alignItems="baseline"
      spacing={4}
    >
      <Slider
        color="primary"
        value={timeRange}
        onChange={(_, v) => setTimeRange(v)}
        onChangeCommitted={(_, v) => handleTimeRangeChange(v)}
        step={1}
        marks={getMarks(timeFormat)}
        min={timeExtent[timeFormat][0]}
        max={timeExtent[timeFormat][1]}
      />
      <ToggleButtonGroup
        sx={{ width: '500px' }}
        fullWidth={true}
        exclusive
        size="small"
        color="primary"
        value={timeFormat}
        onChange={(_, v) => handleTimeFormatChange(v)}
      >
        
        <ToggleButton value="HOUR">Hour</ToggleButton>
        <ToggleButton value="DAYOFWEEK">Day of Week</ToggleButton>
        <ToggleButton value="MONTH">Month</ToggleButton>
      </ToggleButtonGroup>
      
    </Stack>
  )
}

export default Banner