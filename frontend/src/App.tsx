import React from 'react'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Sidebar from './Components/Sidebar'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Login />
        <Register /> */}
        <Sidebar />
      </BrowserRouter>
    </>
  )
}

export default App