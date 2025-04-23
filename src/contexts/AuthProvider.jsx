import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserDetails } from '@firebasegen/default-connector';

<<<<<<< HEAD
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
=======
const AuthContext = createContext();
>>>>>>> 0e804a6508d749f78f4b16b397b5b741d3d01caa

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await getUserDetails({
            userId: user.uid,
          });
          setUserData(response.data.users[0]);
        } catch (error) {
          console.error('Error fetching user details:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      setUserData(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    userData,
    setUserData,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};