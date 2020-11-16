import React, { useEffect, useState } from 'react'

import CallToActionButton from './CallToActionButton'

import styles from './ValidatedNumberField.module.css'

import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

/**
 * This component controls a call to action based on an input. Call to action will be
 * enabled only if the input is a positive integer. No rational numbers, no negative numbers
 * and no alphanumeric characters allowed.
 * Call to action is also disabled if the input number exceeds the maxNumber prop
 * @param props - as specified by ValidatedNumberFieldProps interface
 */
export default function ValidatedNumberField(props: ValidatedNumberFieldProps) {
  const [internalValue, setInternalValue] = useState(props.bindedValue)
  const [errorOnInternalValue, setErrorOnInternalValue] = useState(false)

  const handleCallToActionClick = (newValue: string) => {
    props.handleClick(Number(newValue))
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
        id="internalValue"
        onChange={handleInputChange}
        error={errorOnInternalValue}
        value={internalValue}
        InputProps={{
          endAdornment: <InputAdornment position="end">/ {props.maxNumber}</InputAdornment>
        }}
      />
      <CallToActionButton
        handleClick={() => handleCallToActionClick(internalValue)}
        errorOnInternalValue={errorOnInternalValue}
      />
    </div>
  )
}