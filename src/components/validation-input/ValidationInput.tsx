import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import { useSelector, useDispatch } from 'react-redux'
import styles from './ValidationInput.module.css'

import {
  getValidationGroup,
  setFieldDirty,
  setFieldInvalid,
  setFieldValidationMessage,
  createValidationGroup,
  createFieldInValidationGroup,
  resetShakeState
} from './validationInputsSlice'

interface ValidationInputProps {
  id: string
  label: string
  value: string
  fullWidth?: boolean
  multiline?: boolean
  isEmail?: boolean
  isPhone?: boolean
  maxlength?: number
  rows?: number
  required?: boolean
  helperText?: string
  type?: string
  handleClickShowPassword?: () => void
  showPassword?: boolean
  onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  useShowPasswordAdornment?: boolean
  icon?: JSX.Element
  onChange: (value: string) => void
  validationGroupName: string
}

export default function ValidationInput(props: ValidationInputProps) {
  const dispatch = useDispatch()

  const validationGroup = useSelector(getValidationGroup(props.validationGroupName))

  const getValidationMessage = (): string | undefined => {
    if (validationGroup && validationGroup[props.id]) {
      return validationGroup[props.id].validationMessage
    }
  }

  const getIsInvalid = (): boolean | undefined => {
    if (validationGroup && validationGroup[props.id]) {
      return validationGroup[props.id].isInvalid
    }
  }

  const getIsDirty = (): boolean | undefined => {
    if (validationGroup && validationGroup[props.id]) {
      return validationGroup[props.id].isDirty
    }
  }

  const getIsShaking = (): boolean | undefined => {
    if (validationGroup && validationGroup[props.id]) {
      return validationGroup[props.id].shakeState
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFieldDirty({ name: props.validationGroupName, field: props.id, value: true })
    )
    props.onChange(event.target.value)
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

  if (!validationGroup) {
    dispatch(
      createValidationGroup({ name: props.validationGroupName })
    )
    setupFieldInValidationGroup()
  } else {
    if (validationGroup[props.id] === undefined) {
      setupFieldInValidationGroup()
    }
  }

  return (
    <TextField
      id={props.id}
      label={props.label}
      required={props.required}
      fullWidth={props.fullWidth}
      className={getIsShaking() ? styles.hasShakeAnimation : ''}
      onAnimationEnd={() => dispatch(resetShakeState(props.validationGroupName))}
      variant="outlined"
      value={props.value}
      multiline={props.multiline}
      type={props.type}
      rows={props.rows}
      margin="normal"
      onChange={handleChange}
      onKeyPress={(event) => props.onKeyPress ? props.onKeyPress(event) : undefined}
      error={getIsDirty() && getIsInvalid()}
      helperText={(getIsDirty() && getValidationMessage()) || props.helperText}
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{
        startAdornment: props.icon ? (
          <InputAdornment position="start">
            {props.icon}
          </InputAdornment>
        ) : undefined,
        endAdornment: props.useShowPasswordAdornment ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.handleClickShowPassword}
              edge="end"
            >
              {props.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ) : undefined
      }}
    />
  )
}