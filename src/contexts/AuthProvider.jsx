import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../utils/firebaseConfig";
import {
    signOut,
} from "firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({
  children,
  userDetails = null,
  isSignedIn = null,
  clearUserData,
}) => {
  const [signedIn, setSignedIn] = useState(isSignedIn);
  const [userData, setUserData] = useState(userDetails);
  
  useEffect(() => {
    setSignedIn(isSignedIn);
    setUserData(userDetails);
  }, [userDetails, isSignedIn]);
  // const getUser = async () => {
  //       onAuthStateChanged(auth, async (user) => {
  //           if (user) {
  //               setUser(user);
  //               console.log("🔄 User session restored:", user.uid);
  //               await getUserDetails({ userId: user.uid });
  //           } else {
  //               setUser(null);
  //           }
  //   });
  // }

  const logout = async () => {
    try {
      await signOut(auth);
      clearUserData();
      setSignedIn(false);
      setUserData(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        setSignedIn,
        userData,
        setUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};