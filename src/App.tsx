import React, { useState, useEffect } from 'react'
import SlideRoutes from 'react-slide-routes'
import { Route, useLocation } from 'react-router-dom'
import request from './utils/request'
import './App.css'
import { getInitialCheckState, setState, setInitialCheck } from './userStateSlice'
import { useSelector, useDispatch } from 'react-redux'
import AppHeader from './components/app-header/AppHeader'
import Inicio from './components/inicio/Inicio'
import Productos from './components/productos/Productos'
import Contacto from './components/contacto/Contacto'
import LoginPage from './components/login-page/LoginPage'
import AppFooter from './components/app-footer/AppFooter'
import ToastAlert from './components/toast-alert/ToastAlert'
import Spinner from './components/spinner/Spinner'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const pathList = ['/', '/productos', '/contacto', '/login']
  const [isLoading, setIsLoading] = useState(false)

  const initialCheck = useSelector(getInitialCheckState)

  useEffect(() => {
    const loadUserState = async () => {
      setIsLoading(true)
      try {
        const resp = await request.get('/auth/isValidToken')
        dispatch(
          setState({
            isLoggedIn: true,
            isAdmin: resp.data.isAdmin
          })
        )
        dispatch(setInitialCheck(true))
      } catch(error) {
        const errorId = (error.error && error.error.data && error.error.data.errorId) || null
        dispatch(
          setState({
            isLoggedIn: false,
            isAdmin: false,
            sessionErrorId: errorId
          })
        )
        dispatch(setInitialCheck(true))
      } finally {
        setIsLoading(false)
      }
    }

    if (!initialCheck) {
      loadUserState()
    }
  }, [initialCheck, dispatch])

  let appBody = 
    <div>
      <AppHeader />
      <div className="app-content">
        <SlideRoutes location={location} duration={500} pathList={pathList}>
          <Route path="/" component={Inicio} exact />
          <Route path="/productos" component={Productos} />
          <Route path="/contacto" component={Contacto} />
          <Route path="/login" component={LoginPage} />
        </SlideRoutes>
      </div>
    </div>

  if (isLoading) {
    appBody = <Spinner />
  }
  return (
    <div className="app">
      {appBody}
      <ToastAlert />
      <AppFooter />
    </div>
  )
}

export default App
