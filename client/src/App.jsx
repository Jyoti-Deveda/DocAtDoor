import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './pages/authentication/login/Login'
import Register from './pages/authentication/register/Register'
import { Home } from './pages/home/Home'
import { Navbar } from './components/Common/Navbar'

const App = () => {
  return (
    <div className='App w-screen overflow-x-hidden'>
       
      {/* router was causing error to render navbar this way so used browser router instead ... or dekh lena */}
      <Navbar/>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App