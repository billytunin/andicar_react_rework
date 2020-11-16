import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'

export default function CallToActionButton(props: CallToActionButtonProps) {
  return (
    <IconButton
      aria-label="validated-number-field-call-to-action"
      onClick={() => props.handleClick()}
      disabled={props.errorOnInternalValue}
    >
      <SendIcon />
    </IconButton>
  )
}