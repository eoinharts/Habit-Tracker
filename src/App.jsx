import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router'
import CreateAccount from './pages/CreateAccount'
import Auth from './components/Auth'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<CreateAccount />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
