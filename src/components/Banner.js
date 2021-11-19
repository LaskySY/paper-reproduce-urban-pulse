import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

import { getSliderMarks } from './util.js'
import { TIME_RANGE_MAPPING } from './constant'
import { setType, setDate } from '../store/statusSlicer'


const Banner = () => {
  const dispatch = useDispatch()
  const status = useSelector(state => state.status)
  const [sliderDate, setSliderDate] = useState(status.date)

  const handleDateChange = sliderDate => {
    dispatch(setDate(sliderDate))
  }

  const handleTimeFormatChange = newType => {
    if (newType === status.type || newType === null) return
    dispatch(setDate(0))
    setSliderDate(0)
    dispatch(setType(newType))
  }

  return (
    <Stack
      direction="row"
      alignItems="baseline"
      spacing={4}
    >
      <Slider
        color="primary"
        track={false}
        size={'small'}
        value={sliderDate}
        onChange={(_, v) => setSliderDate(v)}
        onChangeCommitted={(_, v) => handleDateChange(v)}
        step={1}
        marks={getSliderMarks(status.type)}
        min={TIME_RANGE_MAPPING[status.type].min}
        max={TIME_RANGE_MAPPING[status.type].max}
      />
      <ToggleButtonGroup
        sx={{ width: '500px' }}
        fullWidth={true}
        exclusive
        size="small"
        color="primary"
        value={status.type}
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