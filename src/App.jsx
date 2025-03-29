import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router';
import { ConfigProvider } from 'antd';
import { antdConfig } from './theme/antdConfig';
import CreateAccount from './pages/CreateAccount'
import WelcomePage from './pages/WelcomePage'
import ProfilePage from './pages/ProfilePage';
import FriendPage from './pages/FriendPage';
import Auth from './components/Auth'
import { useEffect } from 'react'
import { Layout } from 'antd'
import Home from './pages/Home';
import Components from './pages/Components';
import PhoneContainer from "./components/PhoneContainer";
import HabitHomePage from './pages/HabitHomePage';

function App() {
  return (
    <PhoneContainer>
      <ConfigProvider {...antdConfig}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/friend/:friendId" element={<FriendPage />} />
          <Route path="/habit-home" element={<HabitHomePage />} />
          

        </Routes>
      </ConfigProvider>
    </PhoneContainer>
  );
}

export default App
