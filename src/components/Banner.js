import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

import { TIME_RANGE_MAPPING, DATE_MAPPING } from './constant'
import { setType, setDate } from '../store/statusSlicer'



const Banner = () => {
  const dispatch = useDispatch()
  const dateType = useSelector(state => state.status.type)
  const date = useSelector(state => state.status.date)
  const [sliderDate, setSliderDate] = useState(date)

  const handleDateChange = sliderDate => {
    dispatch(setDate(sliderDate))
  }

  const handleTimeFormatChange = newType => {
    if (newType === dateType || newType === null) return
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
        marks={DATE_MAPPING[dateType].map((d, i) => ({ value: i, label: d }))}
        min={TIME_RANGE_MAPPING[dateType].min}
        max={TIME_RANGE_MAPPING[dateType].max}
      />
      <ToggleButtonGroup
        sx={{ width: '500px' }}
        fullWidth={true}
        exclusive
        size="small"
        color="primary"
        value={dateType}
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