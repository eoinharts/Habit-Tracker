import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router'
import CreateAccount from './pages/CreateAccount'
import Auth from './components/Auth'
import { useEffect } from 'react'
import { Layout } from 'antd'

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/weather").then((res) => res.json()).then((data) => console.log(data));
  }, [])
  return (
    <Layout
      style={{
        minHeight: "100vh",
        minWidth: "320px",
        maxWidth: "400px", // Temporary - we'll stick to mobile screen size first for the app
        margin: "0 auto",
        padding: "0 20px",
        paddingBottom: "70px",
        backgroundColor: "#ede9e9",
      }}
    >
      <Routes>
        <Route path="/" element={<CreateAccount />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Layout>
  );
}

export default App
