import React from 'react'
import { useSelector } from 'react-redux'

import { userState } from '../../userStateSlice'

import LoginBox from './LoginBox'
import CurrentSessionBox from './CurrentSessionBox'

export default function SessionPage() {
  const { isLoggedIn } = useSelector(userState)
  return isLoggedIn ? <CurrentSessionBox /> : <LoginBox />
}