import React, { useEffect, useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

const Banner = ({ map, setMap, fetchData }) => {
  const [timePeriod, setTimePeriod] = useState('HOUR')
  const [scalarLevel, setScalarLevel] = useState(24)
  const [maxScalarLevel, setMaxScalarLevel] = useState(24)

  // Fetch data handler. 
  // Called by handleTimePeriodChange and scalarLevel commit trigger
  const fetchDataHandler = (timePeriod, scalarLevel) =>
    fetchData("_" + timePeriod + "_" + scalarLevel + ".scalars")

  const handleTimePeriodChange = newTimePeriod => {
    if (newTimePeriod === timePeriod || newTimePeriod === null) return

    if (newTimePeriod !== null) {
      setTimePeriod(newTimePeriod)
    }
    var newScalarLevel = scalarLevel
    switch (newTimePeriod) {
      case 'HOUR':
        setMaxScalarLevel(24)
        newScalarLevel = scalarLevel > 24 ? 24 : scalarLevel
        break;
      case 'DAYOFWEEK':
        setMaxScalarLevel(7)
        newScalarLevel = scalarLevel > 7 ? 7 : scalarLevel
        break;
      case 'MONTH':
        setMaxScalarLevel(12)
        newScalarLevel = scalarLevel > 12 ? 12 : scalarLevel
        break;
    }
    setScalarLevel(newScalarLevel)
    fetchDataHandler(newTimePeriod, newScalarLevel)
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      padding={2}
    >
      <Divider>Map</Divider>
      <ToggleButtonGroup
        fullWidth={true}
        exclusive
        size="small"
        orientation="vertical"
        value={map}
        onChange={(_, v) => setMap(v)}
        color="primary"
      >
        <ToggleButton value="None">None</ToggleButton>
        <ToggleButton value="Map1">Map1</ToggleButton>
        <ToggleButton value="Map2">Map2</ToggleButton>
      </ToggleButtonGroup>
      <Divider>Time</Divider>
      <ToggleButtonGroup
        fullWidth={true}
        exclusive
        size="small"
        color="primary"
        orientation="vertical"
        value={timePeriod}
        onChange={(_, v) => handleTimePeriodChange(v)}
      >
        <ToggleButton value="HOUR">Hour</ToggleButton>
        <ToggleButton value="DAYOFWEEK">DOW</ToggleButton>
        <ToggleButton value="MONTH">Month</ToggleButton>
      </ToggleButtonGroup>
      <Divider>Scalars</Divider>
      <Slider
        sx={{ height: 200 }}
        color="primary"
        orientation="vertical"
        valueLabelDisplay='auto'
        value={scalarLevel}
        onChange={(_, v) => setScalarLevel(v)}
        onChangeCommitted={(_, v) => fetchDataHandler(timePeriod, v)}
        step={1}
        marks
        min={1}
        max={maxScalarLevel}
      />
    </Stack>
  )
}

export default Banner