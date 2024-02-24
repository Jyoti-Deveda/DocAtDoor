import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/authentication/login/Login'
import Register from './pages/authentication/register/Register'
import { Home } from './pages/home/Home'
import { Navbar } from './components/Common/Navbar'
import Layout from './components/Layouts/Layout/Layout'

const App = () => {
  return (
    <div className='App w-screen overflow-x-hidden'>
      <Router>
        {/* There will be two types of layout, one for protected routes and other for normal routes. */}
        <Layout>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App