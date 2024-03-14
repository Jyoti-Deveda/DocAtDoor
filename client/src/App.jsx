import React from 'react'
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom'
import Layout from './components/Layouts/Layout/Layout'
import Routes from './Routes'
import Login from './pages/authentication/login/Login'
import Register from './pages/authentication/register/Register'
import { VerifyEmailMessage } from './pages/authentication/email-verification/VerifyEmailMessage'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <ReactRoutes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify-email' element={<VerifyEmailMessage />} />
        </ReactRoutes>
        <Routes />
      </BrowserRouter>
    </div>
  )
}

export default App