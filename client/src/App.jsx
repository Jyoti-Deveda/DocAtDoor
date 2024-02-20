import React from 'react'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './pages/authentication/login/Login'
import Register from './pages/authentication/register/Register'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App