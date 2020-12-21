import React, { useEffect, useState } from 'react'

import CallToActionButton from './CallToActionButton'

import styles from './ValidatedNumberField.module.css'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      '& .MuiInputBase-input': {
        width: '40px'
      }
    },
    inputAdornment: {
      opacity: 0.4
    }
  })
)

/**
 * This component controls a call to action based on an input. Call to action will be
 * enabled only if the input is a positive integer. No rational numbers, no negative numbers
 * and no alphanumeric characters allowed.
 * Call to action is also disabled if the input number exceeds the maxNumber prop, or if "isDisabled" prop is true
 * @param props - as specified by ValidatedNumberFieldProps interface
 */
export default function ValidatedNumberField(props: ValidatedNumberFieldProps) {
  const classes = useStyles()

  const [internalValue, setInternalValue] = useState(props.bindedValue)
  const [errorOnInternalValue, setErrorOnInternalValue] = useState(false)

  const handleCallToActionClick = (newValue: string) => {
    props.handleClick(Number(newValue))
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !errorOnInternalValue) {
      handleCallToActionClick(internalValue)
    }
  }

  useEffect(() => {
    setInternalValue(props.bindedValue)
    setErrorOnInternalValue(false)
  }, [props.bindedValue])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInternalValue(newValue)
    const onlyPositiveIntegersRegExp = /^\d*[1-9]\d*$/
    if (onlyPositiveIntegersRegExp.test(newValue) && Number(newValue) <= props.maxNumber) {
      setErrorOnInternalValue(false)
    } else {
      setErrorOnInternalValue(true)
    }
  }

  return (
    <div className={styles.root}>
      <TextField
        onChange={handleInputChange}
        error={errorOnInternalValue}
        className={classes.textField}
        value={internalValue}
        disabled={props.isDisabled}
        InputProps={{
          endAdornment: <InputAdornment position="end" className={classes.inputAdornment}>/ {props.maxNumber}</InputAdornment>
        }}
        onKeyPress={handleKeyPress}
      />
      <CallToActionButton
        isDisabled={props.isDisabled}
        handleClick={() => handleCallToActionClick(internalValue)}
        errorOnInternalValue={errorOnInternalValue}
      />
    </div>
  )
}