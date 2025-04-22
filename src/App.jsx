import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";
import { antdConfig } from "./theme/antdConfig";
import CreateAccount from "./pages/CreateAccount";
import WelcomePage from "./pages/WelcomePage";
import Auth from "./components/Auth";
import { useEffect } from "react";
import PhoneContainer from "./components/PhoneContainer";
import { auth } from "./utils/firebaseConfig";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getUserDetails } from "@firebasegen/default-connector";
import { Spin } from "antd";
import AuthenticatedRoutes from "./components/AuthenticatedRoutes";
import { AuthProvider } from "./contexts/AuthProvider";
import AchievementTest from "./pages/AchievementTest";
import UserAchievements from "./pages/UserAchievements";

const provider = new GoogleAuthProvider();

const AppContent = () => {
  const [signedIn, setSignedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("🔄 User session restored:", user.uid);
        const response = await getUserDetails({
          userId: user.uid,
        });
        setUserData(response.data.users[0]);
        setSignedIn(true);
      } else {
        setUserData(false);
        setSignedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const clearUserData = () => {
    setSignedIn(false);
    setUserData(null);
  };

  return (
    <PhoneContainer isSignedIn={signedIn}>
      {signedIn === null ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spin size="large" />
        </div>
      ) : signedIn === false ? (
        <Routes>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/achievement-test" element={<AchievementTest />} />
          <Route path="/user-achievements" element={<UserAchievements />} />
        </Routes>
      ) : (
        <AuthenticatedRoutes />
      )}
    </PhoneContainer>
  );
};

const App = () => {
  return (
    <ConfigProvider {...antdConfig}>
      <AntApp>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<AppContent />} />
          </Routes>
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
