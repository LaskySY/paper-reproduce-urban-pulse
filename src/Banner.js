import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

import { getSliderMarks } from './util.js'
import { TIME_MAPPING } from './constant'
import { setType, setRange } from './store/statusSlicer'


const Banner = () => {
  const dispatch = useDispatch()
  const status = useSelector(state => state.status)
  // const [sliderRange, setSliderRange] = useState(status.range)

  // const handleRangeChange = sliderRange => {
  //   dispatch(setRange(sliderRange))
  // }

  const handleTimeFormatChange = newType => {
    if (newType === status.type || newType === null) return
    // dispatch(setRange(TIME_MAPPING[newType]))
    dispatch(setType(newType))
  }

  return (
    <Stack
      direction="row"
      alignItems="baseline"
      spacing={4}
    >
      {/* <Slider
        color="primary"
        value={sliderRange}
        onChange={(_, v) => setSliderRange(v)}
        onChangeCommitted={(_, v) => handleRangeChange(v)}
        step={1}
        marks={getSliderMarks(status.type)}
        min={TIME_MAPPING[status.type][0]}
        max={TIME_MAPPING[status.type][1]}
      /> */}
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