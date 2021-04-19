import React, { useState } from 'react'

import styles from './ValidatedNumberField.module.css'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      '& .MuiInputBase-input': {
        width: '40px',
        padding: '5px'
      }
    },
    inputAdornment: {
      opacity: 0.4
    }
  })
)

/**
 * This component controls an input. No rational numbers, no negative numbers and no alphanumeric characters allowed. Input can't exceed maxNumber prop either
 * Everytime input changes, it fires an event to its parent indicating the new value and if its valid or not according to that criteria.
 * An optional "isDisabled" prop can be provided to disable the TextInput
 * An optional "enterKeyPressed" prop function can be provided in order to catch "ENTER" key presses
 * @param props - as specified by ValidatedNumberFieldProps interface
 */
export default function ValidatedNumberField(props: ValidatedNumberFieldProps) {
  const classes = useStyles()

  const [isInvalid, setIsInvalid] = useState(false)

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !isInvalid && props.enterKeyPressed) {
      props.enterKeyPressed()
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const onlyPositiveIntegersRegExp = /^\d*[1-9]\d*$/
    if (onlyPositiveIntegersRegExp.test(newValue) && Number(newValue) <= props.maxNumber) {
      setIsInvalid(false)
      props.bindedValueChanged(newValue, false)
    } else {
      setIsInvalid(true)
      props.bindedValueChanged(newValue, true)
    }
  }

  return (
    <div className={styles.root}>
      <TextField
        onChange={handleInputChange}
        error={isInvalid}
        className={classes.textField}
        value={props.bindedValue}
        disabled={props.isDisabled}
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end" className={classes.inputAdornment}>/ {props.maxNumber}</InputAdornment>
        }}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}