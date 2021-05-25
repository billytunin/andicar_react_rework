import React from 'react'

import { FLOAT_NUMBER_REGEXP } from '../../utils/constants'

import ValidationInput from '../validation-input/ValidationInput'

interface ValidatedFloatNumberFieldProps {
  entityName: string
  uniqueId: string | number
  label: string
  value: string | number
  validationGroupName: string
  onChange: (value: string | number) => void
}

export default function ValidatedFloatNumberField(props: ValidatedFloatNumberFieldProps) {
  const internalValue: string = typeof props.value === 'string' ? props.value : props.value.toString()

  const onChange = (value: string) => {
    const endsWithPointCharacter = value.endsWith('.')
    props.onChange(value !== '' && !endsWithPointCharacter && FLOAT_NUMBER_REGEXP.test(value) ? parseFloat(value) : value)
  }
  return (
    <ValidationInput
      id={`${props.entityName}-${props.uniqueId}-${props.label}`}
      value={internalValue}
      label={props.label}
      onChange={onChange}
      validationGroupName={props.validationGroupName}
      isFloatNumber
      fullWidth
      required
      maxlength={10}
    />
  )
}