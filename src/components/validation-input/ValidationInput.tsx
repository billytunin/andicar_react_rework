import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useDispatch } from 'react-redux';

interface ValidationInputProps {
  id: string,
  label: string,
  fullWidth?: boolean,
  multiline?: boolean,
  rows?: number,
  required?: boolean,
  helperText?: string,
  icon?: JSX.Element,
  actionOnChange?: any // TODO: Type-ear bien esto
}

export function ValidationInput(props: ValidationInputProps) {
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      props.actionOnChange(event.target.value)
    )
  }

  return (
    <TextField
      id={props.id}
      label={props.label}
      required={props.required}
      fullWidth={props.fullWidth}
      variant="outlined"
      multiline={props.multiline}
      rows={props.rows}
      margin="normal"
      onChange={handleChange}
      helperText={props.helperText}
      InputLabelProps={{
        shrink: true
      }}
      InputProps={props.icon ? {
        startAdornment: (
          <InputAdornment position="start">
            {props.icon}
          </InputAdornment>
        )
      } : undefined }
    />
  )
}