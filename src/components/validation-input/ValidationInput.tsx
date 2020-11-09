import React, { useState } from 'react'
import { isEmpty } from 'lodash'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useSelector, useDispatch } from 'react-redux'

import {
  getValidationGroups,
  setFieldDirty,
  setFieldInvalid,
  setFieldValidationMessage,
  createValidationGroup,
  createFieldOnValidationGroup
} from './validationInputsSlice'

interface ValidationInputProps {
  id: string
  label: string
  fullWidth?: boolean
  multiline?: boolean
  rows?: number
  required?: boolean
  helperText?: string
  icon?: JSX.Element
  onChange: ({ field, value }: SetValueAction) => void
  validationGroupName: string
}

export function ValidationInput(props: ValidationInputProps) {
  const dispatch = useDispatch()

  const [currentValue, setCurrentValue] = useState('')

  const validationGroups = useSelector(getValidationGroups)
  const validationGroupDoesntExists = isEmpty(validationGroups) || !validationGroups[props.validationGroupName]

  const getValidationMessage = (): string | undefined => {
    if (!validationGroupDoesntExists && validationGroups[props.validationGroupName][props.id]) {
      return validationGroups[props.validationGroupName][props.id].validationMessage
    }
  }

  const getIsInvalid = (): boolean | undefined => {
    if (!validationGroupDoesntExists && validationGroups[props.validationGroupName][props.id]) {
      return validationGroups[props.validationGroupName][props.id].isInvalid
    }
  }

  const getIsDirty = (): boolean | undefined => {
    if (!validationGroupDoesntExists && validationGroups[props.validationGroupName][props.id]) {
      return validationGroups[props.validationGroupName][props.id].isDirty
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCurrentValue(newValue)
    runValidations(newValue)
    dispatch(
      setFieldDirty({ name: props.validationGroupName, field: props.id, value: true })
    )
    props.onChange({ field: props.id, value: newValue })
  }

  const requiredValidation = (newValue: string) => {
    if (props.required && !newValue) {
      dispatch(
        setFieldInvalid({ name: props.validationGroupName, field: props.id, value: true })
      )
      dispatch(
        setFieldValidationMessage({ name: props.validationGroupName, field: props.id, value: 'Campo requerido' })
      )
    } else {
      dispatch(
        setFieldInvalid({ name: props.validationGroupName, field: props.id, value: false })
      )
      dispatch(
        setFieldValidationMessage({ name: props.validationGroupName, field: props.id, value: undefined })
      )
    }
  }

  const runValidations = (value: string) => {
    requiredValidation(value)
  }

  const createFieldInValidationGroup = () => {
    dispatch(
      createFieldOnValidationGroup({
        validationGroupName: props.validationGroupName,
        name: props.id,
        isInvalid: false
      })
    )
    runValidations(currentValue)
  }

  if (validationGroupDoesntExists) {
    dispatch(
      createValidationGroup({ name: props.validationGroupName })
    )
    createFieldInValidationGroup()
  } else {
    if (validationGroups[props.validationGroupName][props.id] === undefined) {
      createFieldInValidationGroup()
    }
  }

  return (
    <TextField
      id={props.id}
      label={props.label}
      required={props.required}
      fullWidth={props.fullWidth}
      variant="outlined"
      value={currentValue}
      multiline={props.multiline}
      rows={props.rows}
      margin="normal"
      onChange={handleChange}
      error={getIsDirty() && getIsInvalid()}
      helperText={(getIsDirty() && getValidationMessage()) || props.helperText}
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