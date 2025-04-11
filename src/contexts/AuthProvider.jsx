import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../utils/firebaseConfig";
import {
    signOut,
} from "firebase/auth";
import { getUserDetails } from "@firebasegen/default-connector";

const AuthContext = createContext(null);

export const AuthProvider = ({
  children,
  userDetails = null,
  isSignedIn = null,
  clearUserData,
}) => {
  const [signedIn, setSignedIn] = useState(isSignedIn);
  const [userData, setUserData] = useState(userDetails);

  const getNewStreakCount = async (userId) => {
    try {
      const res = await getUserDetails({ userId: userId });
      console.log(res.data.users[0]);
      setUserData({ ...userData, totalStreak: res.data.users[0].totalStreak, totalPoints: res.data.users[0].totalPoints });
    } catch (error) {
      console.log(error);
    }
  }
  
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
        getNewStreakCount
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