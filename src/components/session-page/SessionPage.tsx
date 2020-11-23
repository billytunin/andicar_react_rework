import React from 'react'
import { useSelector } from 'react-redux'

import { userState } from '../../userStateSlice'

import LoginBox from './LoginBox'
import CurrentSessionBox from './CurrentSessionBox'
import AdminBox from '../admin-box/AdminBox'

export default function SessionPage() {
  const { isLoggedIn, isAdmin } = useSelector(userState)
  return isLoggedIn ?
    <div>
      <CurrentSessionBox />
      {isAdmin ? <AdminBox /> : undefined}
    </div>
    :
    <LoginBox />
}