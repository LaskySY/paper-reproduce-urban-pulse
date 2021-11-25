import React, { useState } from 'react'
import { Button, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import { setMode } from '../store/statusSlicer'
import { MODE_MAPPING, LOCATION_KEY_MAPPING } from './constant'
import { setHighlight } from '../store/dataSlicer'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Locations = ({ nycScatterLength, sfScatterLength }) => {
  const dispatch = useDispatch()
  const [location, setLocation] = useState('All')
  const [open, setOpen] = React.useState(false);

  const handleLocationChange = newLocation => {
    if (newLocation === 'All') {
      setLocation('All')
      dispatch(setMode(MODE_MAPPING.NORMAL))
    } else {
      setLocation(newLocation.name)
      dispatch(setMode(MODE_MAPPING.LOCATION))
      if (newLocation.city === 'nyc') {
        dispatch(setHighlight({
          nycHighlight: newLocation.key,
          sfHighlight: []
        }))
      } else {
        dispatch(setHighlight({
          nycHighlight: [],
          sfHighlight: newLocation.key
        }))
      }
    }
    setOpen(false)
  }

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        sx={{ height: '125px', width: '100%', fontSize: 40, color: 'black' }}
      > {location}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography component="h1" sx={{ textAlign: 'center' }}>Choose Dataset</Typography>
          <Button variant="outlined"
            onClick={() => handleLocationChange('All')}
          > All
          </Button>
          <Typography component="h2">New York City:</Typography>
          <Button variant="outlined"
            onClick={() => handleLocationChange(LOCATION_KEY_MAPPING['Rockefeller Center'])}
          > Rockefeller Center
          </Button>&nbsp;
          <Button variant="outlined"
            onClick={() => handleLocationChange(LOCATION_KEY_MAPPING['Greenwich Village'])}
          > Greenwich Village
          </Button>
          <Typography component="h2">San Francisco:</Typography>
          <Button variant="outlined"
            onClick={() => handleLocationChange(LOCATION_KEY_MAPPING['Alcatraz Island'])}
          > Alcatraz Island
          </Button>&nbsp;
          <Button variant="outlined"
            onClick={() => handleLocationChange(LOCATION_KEY_MAPPING['Western Addition'])}
          > Western Addition
          </Button>
        </Box>
      </Modal>
    </div>
  )

}

export default Locations