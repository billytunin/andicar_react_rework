import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'

export default function GoToPageButton(props: GoToPageButtonProps) {
  return (
    <IconButton
      aria-label="go-to-page"
      onClick={() => props.handleClick()}
      disabled={props.errorOnGoToPage}
    >
      <SendIcon />
    </IconButton>
  )
}