import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { ConfigProvider } from "antd";
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
import { AuthProvider, useAuth } from "./contexts/AuthProvider";

const provider = new GoogleAuthProvider();
function App() {
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
    <PhoneContainer>
      <ConfigProvider {...antdConfig}>
        <AuthProvider
          userDetails={userData}
          isSignedIn={signedIn}
          clearUserData={clearUserData}
        >
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
            </Routes>
          ) : (
            <AuthenticatedRoutes />
          )}
        </AuthProvider>
      </ConfigProvider>
    </PhoneContainer>
  );
}

export default App;
