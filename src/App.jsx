import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router';
import CreateAccount from './pages/CreateAccount'
import WelcomePage from './pages/WelcomePage'
import Auth from './components/Auth'
import { useEffect } from 'react'
import { Layout } from 'antd'
import Home from './pages/Home';
import Components from './pages/Components';

function App() {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        minWidth: "320px",
        maxWidth: "400px", // Temporary - we'll stick to mobile screen size first for the app
        margin: "0 auto",
        // padding: "0 20px",
        paddingBottom: "70px",
        backgroundColor: "#F6F9FF",
      }}
    >
      <Routes>
        {/* Welcome Page is now the default */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Layout>
  );
}

export default App
