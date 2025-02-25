import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router'
import CreateAccount from './pages/CreateAccount'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<CreateAccount />} />
      </Routes>
    </>
  )
}

export default App
