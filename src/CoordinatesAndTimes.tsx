import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { nanoid } from 'nanoid'
import { CircularProgress, Grid } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: '10em'
  },
  table: {
    minWidth: 400
  }
})

type CoordinatesAndTimesProps = {
  times: { sunset: string; sunrise: string }[]
  locations: { latitude: string; longitude: string }[]
}
export function CoordinatesAndTimes ({
  times,
  locations
}: CoordinatesAndTimesProps) {
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={3}
      className={classes.root}
      justifyContent='center'
      alignItems='center'
    >
      <Grid item>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>latitude</TableCell>
                <TableCell align='right'>longitude</TableCell>
                <TableCell align='right'>sunrise</TableCell>
                <TableCell align='right'>sunset</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {times.length !== 0 ? null : <CircularProgress />}
              {times.length === 0
                ? null
                : locations.map((location, i) => (
                    <TableRow key={nanoid()}>
                      <TableCell component='th' scope='row'>
                        {location.latitude}
                      </TableCell>
                      <TableCell align='right'>{location.longitude}</TableCell>
                      <TableCell align='right'>
                        {getTransitionTime(times[i].sunrise)}
                      </TableCell>
                      <TableCell align='right'>
                        {getTransitionTime(times[i].sunset)}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

function getTransitionTime (time: string) {
  const date = new Date(time)
  // this is a hacky way to detect when the user has selected
  // coordinates that will not have a sunrise or sunset today
  // e.g. because they are on a pole
  if (date <= new Date('1970-01-02Z')) {
    return 'N/A'
  }
  return date.toLocaleTimeString([], {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
