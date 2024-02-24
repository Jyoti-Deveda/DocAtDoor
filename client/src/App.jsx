import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layouts/Layout/Layout'
import Routes from './Routes'

const App = () => {
  return (
    <div className='App w-screen overflow-x-hidden'>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  )
}

export default App