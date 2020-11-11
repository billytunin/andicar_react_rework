import React from 'react'
import styles from './Spinner.module.css'

const Spinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.spinner}
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#e15b64" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round" transform="rotate(287.558 50 50)">
        <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
      </circle>
      <circle cx="50" cy="50" r="23" strokeWidth="8" stroke="#f8b26a" strokeDasharray="36.12831551628262 36.12831551628262" strokeDashoffset="36.12831551628262" fill="none" strokeLinecap="round" transform="rotate(-287.558 50 50)">
        <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
      </circle>
    </svg>
  )
}

export default Spinner