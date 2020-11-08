import React from 'react';
import SlideRoutes from 'react-slide-routes';
import { Route, useLocation } from 'react-router-dom';
import './App.css';
import { AppHeader } from './components/app-header/AppHeader';
import { Inicio } from './components/inicio/Inicio'
import { Productos } from './components/productos/Productos'
import { Contacto } from './components/contacto/Contacto'
import { AppFooter } from './components/app-footer/AppFooter'

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <AppHeader />
      <div className="app-content">
        <SlideRoutes location={location} duration={500} pathList={['/', '/productos', '/contacto']}>
          <Route path="/" component={Inicio} exact />
          <Route path="/productos" component={Productos} />
          <Route path="/contacto" component={Contacto} />
        </SlideRoutes>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
