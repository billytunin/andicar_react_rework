import React, { useEffect } from 'react'
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
  createFieldInValidationGroup
} from './validationInputsSlice'

interface ValidationInputProps {
  id: string
  label: string
  value: string // TODO: cambiar esto a any?
  fullWidth?: boolean
  multiline?: boolean
  isEmail?: boolean
  isPhone?: boolean
  maxlength?: number
  rows?: number
  required?: boolean
  helperText?: string
  icon?: JSX.Element
  onChange: ({ field, value }: SetValueAction) => void
  validationGroupName: string
}

export function ValidationInput(props: ValidationInputProps) {
  const dispatch = useDispatch()

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
    dispatch(
      setFieldDirty({ name: props.validationGroupName, field: props.id, value: true })
    )
    props.onChange({ field: props.id, value: event.target.value })
  }

  useEffect(() => {
    runValidations()
  })

  /**
   * Checks if current field value complies with the "Required" validation.
   * If it doesn't, the validation field state in the validationInputSlice will be modified.
   * Returns false if it complies with the validation, true otherwise
   */
  const requiredValidation = (): boolean => {
    let hasError = false
    if (props.required && !props.value) {
      hasError = true
      dispatch(
        setFieldInvalid({ name: props.validationGroupName, field: props.id, value: true })
      )
      dispatch(
        setFieldValidationMessage({ name: props.validationGroupName, field: props.id, value: 'Campo requerido' })
      )
    }

    return hasError
  }

  /**
   * Checks if current field value complies with the "Email" validation.
   * If it doesn't, the validation field state in the validationInputSlice will be modified.
   * Returns false if it complies with the validation, true otherwise
   */
  const emailValidation = (): boolean => {
    let hasError = false
    const emailRegexp = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    if (props.isEmail && !emailRegexp.test(props.value)) {
      hasError = true
      dispatch(
        setFieldInvalid({ name: props.validationGroupName, field: props.id, value: true })
      )
      dispatch(
        setFieldValidationMessage({ name: props.validationGroupName, field: props.id, value: 'Formato de e-mail incorrecto' })
      )
    }

    return hasError
  }

  /**
   * Checks if current field value complies with the "Phone" validation.
   * If it doesn't, the validation field state in the validationInputSlice will be modified.
   * Returns false if it complies with the validation, true otherwise
   */
  const phoneValidation = (): boolean => {
    let hasError = false
    const emailRegexp = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g)
    if (props.isPhone && props.value && !emailRegexp.test(props.value)) {
      hasError = true
      dispatch(
        setFieldInvalid({ name: props.validationGroupName, field: props.id, value: true })
      )
      dispatch(
        setFieldValidationMessage({ name: props.validationGroupName, field: props.id, value: 'Formato de teléfono incorrecto' })
      )
    }

    return hasError
  }

  /**
   * Checks if current field value complies with the "Maxlength" validation.
   * If it doesn't, the validation field state in the validationInputSlice will be modified.
   * Returns false if it complies with the validation, true otherwise
   */
  const maxlengthValidation = (): boolean => {
    let hasError = false
    if (props.maxlength !== undefined && props.value.length > props.maxlength) {
      hasError = true
      dispatch(
        setFieldInvalid({ name: props.validationGroupName, field: props.id, value: true })
      )
      dispatch(
        setFieldValidationMessage({
          name: props.validationGroupName,
          field: props.id, value: `La cantidad máxima de caracteres para este campo es ${props.maxlength}`
        })
      )
    }

    return hasError
  }

  const runValidations = () => {
    const hasErrors = requiredValidation() || maxlengthValidation() || emailValidation() || phoneValidation()
    if (!hasErrors) {
      dispatch(
        setFieldInvalid({ name: props.validationGroupName, field: props.id, value: false })
      )
      dispatch(
        setFieldValidationMessage({ name: props.validationGroupName, field: props.id, value: undefined })
      )
    }
  }

  const setupFieldInValidationGroup = () => {
    dispatch(
      createFieldInValidationGroup({
        validationGroupName: props.validationGroupName,
        name: props.id,
        isInvalid: false
      })
    )
    runValidations()
  }

  if (validationGroupDoesntExists) {
    dispatch(
      createValidationGroup({ name: props.validationGroupName })
    )
    setupFieldInValidationGroup()
  } else {
    if (validationGroups[props.validationGroupName][props.id] === undefined) {
      setupFieldInValidationGroup()
    }
  }

  return (
    <TextField
      id={props.id}
      label={props.label}
      required={props.required}
      fullWidth={props.fullWidth}
      variant="outlined"
      value={props.value}
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