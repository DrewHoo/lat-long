import { Grid, makeStyles } from '@material-ui/core'
import { Location } from './Location'

type CoordinateIntakeProps = {
  dispatch: (arg: any) => void
  canAddNext: boolean
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '10em'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

export function CoordinateIntake ({
  dispatch,
  canAddNext
}: CoordinateIntakeProps) {
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={3}
      className={classes.root}
      justifyContent='center'
      alignItems='center'
    >
      <Grid item xs={8} md={6}>
        <Location dispatch={dispatch} canAddNext={canAddNext} />
      </Grid>
    </Grid>
  )
}
