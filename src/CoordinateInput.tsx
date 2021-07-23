import { makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  textField: {
    '&::-webkit-outer-spin-button': {
      display: 'none'
    },
    '&::-webkit-inner-spin-button': {
      display: 'none'
    },
    '&[type=number]': {
      '-moz-appearance': 'textfield'
    }
  }
}))

type CoordinateInputProps = {
  name: string
  value: string
  onChange: (event: { target: { value: string } }) => void
}

export function CoordinateInput ({
  name,
  onChange,
  value
}: CoordinateInputProps) {
  const classes = useStyles()
  return (
    <TextField
      className={classes.textField}
      id={`${name}-input`}
      label={name}
      value={value}
      onChange={onChange}
      variant='outlined'
      InputProps={{
        inputProps: {
          className: classes.textField,
          type: 'number',
          required: true,
          placeholder: '0.0000',
          // 4 decimal places is accurate to ~10 meters at the equator
          // so it's a good limit for sunrise time since the time will be
          // more affected by local geography at that precision
          step: '0.0001',
          min: '-90',
          max: '90'
        }
      }}
    />
  )
}
