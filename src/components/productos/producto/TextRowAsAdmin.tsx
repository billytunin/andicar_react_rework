import React from 'react'

import ValidationInput from '../../validation-input/ValidationInput'

interface TextRowAsAdminProps {
  productoId: number
  label: string
  value: string
  validationGroupName: string
  onChange: (value: string) => void
}

export default function TextRowAsAdmin(props: TextRowAsAdminProps) {
  return (
    <ValidationInput
      id={`producto-${props.productoId}-${props.label}`}
      value={props.value}
      label={props.label}
      onChange={props.onChange}
      validationGroupName={props.validationGroupName}
      fullWidth
      required
      maxlength={20}
    />
  )
}