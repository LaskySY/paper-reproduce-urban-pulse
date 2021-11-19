import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const PulseChart = () => {
  const dispatch = useDispatch()
  const dateType = useSelector(state=> state.status.type)
  const nycData = useSelector(state => state.data.nyc)
  const sfData = useSelector(state => state.data.sf)

  return (
    <div>

    </div>
  );
}

export default PulseChart