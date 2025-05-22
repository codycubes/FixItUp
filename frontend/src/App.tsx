import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import Dashboard from './Pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {/* Sidebar with fixed width */}
        <Sidebar />
        {/* Main content area */}
        <div className="flex-grow flex flex-col">
          {/* Navbar at the top */}
          <Navbar />
          {/* Main content below the Navbar */}
          <div className="flex-grow p-5">
            <Routes>
            <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add other routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App