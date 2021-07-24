import React, { useEffect, useReducer, useState } from 'react'
import { CoordinateIntake } from './CoordinateIntake'
import { CoordinatesAndTimes } from './CoordinatesAndTimes'
import { Snackbar } from './Snackbar'

function App () {
  const [open, setOpen] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    locations: [],
    times: []
  })
  const [showResults, setShowResults] = useState(false)
  const { locations, times } = state

  useEffect(() => {
    // this would be dangerous if it caused locations to get recreated
    // since it could create an infinite render loop
    if (locations.length === 5) {
      setShowResults(true)
      const fetchTimes = async () => {
        const times = await Promise.all(
          locations.map(async ({ latitude, longitude }) => {
            const response = await fetch(
              `https://api.sunrise-sunset.org/json?${new URLSearchParams(
                Object.entries({
                  lat: parseCoordinate(latitude),
                  lng: parseCoordinate(longitude),
                  formatted: '0',
                  date: getCurrentDate()
                })
              ).toString()}`
            )
            const body = await response.json()
            if (response.status !== 200) {
              setOpen(true)
            }
            return {
              latitude,
              longitude,
              timeInfo: body.results
            }
          })
        )
        dispatch({ type: 'addTimes', times })
      }
      fetchTimes()
    }
  }, [locations, setOpen])

  return (
    <div className='App'>
      <Snackbar
        message='There was an error. Make sure you are connected to the internet'
        open={open}
        setOpen={setOpen}
        severity='error'
      />
      {showResults ? null : (
        <>
          <CoordinateIntake
            dispatch={dispatch}
            canAddNext={locations.length < 4}
          />
        </>
      )}
      {!showResults ? null : (
        <CoordinatesAndTimes times={times} locations={locations} />
      )}
    </div>
  )
}

export default App

type ReducerState = {
  locations: {
    latitude: string
    longitude: string
  }[]
  times: {
    sunset: string
    sunrise: string
  }[]
}

function reducer (state: ReducerState, action: any) {
  switch (action.type) {
    case 'addTimes': {
      const { times } = action

      return {
        ...state,
        times: times.map(
          ({ latitude, longitude, timeInfo: { sunrise, sunset } }: any) => ({
            latitude,
            longitude,
            sunrise,
            sunset
          })
        )
      }
    }
    case 'addLocation': {
      const { latitude, longitude } = action
      return {
        ...state,
        locations: [
          ...state.locations,
          {
            latitude,
            longitude
          }
        ]
      }
    }
    default:
      throw new Error()
  }
}

// the api I'm using has a bug where it won't accept 0,0 lat/long coordinates
// so adding a tiny a value prevents the bug from happening
// and only changes the location by ~1 centimeter
function parseCoordinate (coordinate: string) {
  const float = parseFloat(coordinate)
  if (float === 0) {
    return String(float + 0.0000001)
  }
  return String(float)
}

function getCurrentDate () {
  const date = new Date()
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
}
