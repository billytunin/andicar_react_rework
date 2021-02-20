import React, { useState } from 'react'

import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import styles from './AdminBox.module.css'

export default function AdminBoxPanel(props: AdminBoxPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={styles.smallMarginBottom}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => setIsExpanded(!isExpanded)}
        endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {props.text}
      </Button>
      <Collapse in={isExpanded}>
        {props.children}
      </Collapse>
    </div>
  )
}