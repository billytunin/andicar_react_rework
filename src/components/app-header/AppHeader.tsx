import React from 'react'
import { useSelector } from 'react-redux'

import AppHeaderMobile from './AppHeaderMobile'
import AppHeaderDesktop from './AppHeaderDesktop'

import { getIsMobileVersion } from '../../userStateSlice'

export default function AppHeader() {
  const mobileVersion = useSelector(getIsMobileVersion)
  const pathArray: Array<PathObject> = [
    {
      path: '/',
      text: 'INICIO',
      shouldBeExactPath: true
    },
    {
      path: '/productos',
      text: 'PRODUCTOS'
    },
    {
      path: '/contacto',
      text: 'CONTACTO'
    },
    {
      path: '/session',
      text: 'SESIÓN'
    }
  ]

  return mobileVersion ? <AppHeaderMobile pathArray={pathArray} /> : <AppHeaderDesktop pathArray={pathArray} />
}