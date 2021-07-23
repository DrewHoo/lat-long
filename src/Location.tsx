import React, { useCallback, useState } from 'react'
import { Button, Grid } from '@material-ui/core/'
import { Snackbar } from './Snackbar'
import { CoordinateInput } from './CoordinateInput'

type LocationProps = {
  dispatch: any
  canAddNext: boolean
}

const initialCoordinateValue = ''

export function Location ({ dispatch, canAddNext }: LocationProps) {
  const [latitude, setLatitude] = useState(initialCoordinateValue)
  const [longitude, setLongitude] = useState(initialCoordinateValue)
  const handleLatitudeChange = useCallback(
    (event: { target: { value: string } }) => {
      setLatitude(event.target.value)
    },
    [setLatitude]
  )
  const handleLongitudeChange = useCallback(
    (event: { target: { value: string } }) => {
      setLongitude(event.target.value)
    },
    [setLongitude]
  )

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      dispatch({ type: 'addLocation', latitude, longitude })
      setLatitude(initialCoordinateValue)
      setLongitude(initialCoordinateValue)
    },
    [longitude, latitude, dispatch]
  )

  const [open, setOpen] = React.useState(false)

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12} sm={4}>
          <CoordinateInput
            onChange={handleLatitudeChange}
            name='latitude'
            value={latitude}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CoordinateInput
            onChange={handleLongitudeChange}
            name='longitude'
            value={longitude}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Snackbar open={open} setOpen={setOpen} message='Location Added!' />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            onClick={() => setOpen(true)}
          >
            {canAddNext ? 'Next' : 'Find Times'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
