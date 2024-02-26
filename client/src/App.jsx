import React from 'react'
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom'
import Layout from './components/Layouts/Layout/Layout'
import Routes from './Routes'
import Login from './pages/authentication/login/Login'
import Register from './pages/authentication/register/Register'

const App = () => {
  return (
    <div className='App w-screen overflow-x-hidden'>
      <BrowserRouter>
        <ReactRoutes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </ReactRoutes>
        <Routes />
      </BrowserRouter>
    </div>
  )
}

export default App