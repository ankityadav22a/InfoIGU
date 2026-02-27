// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Departments from './pages/Departments'
import Department from './pages/Department'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Departments/>} />
      <Route path="/department" element={<Department/>} />
    </Routes>
  )
}

export default App
