import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserDetails } from '@firebasegen/default-connector';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({
  children,
  userDetails = null,
  isSignedIn = null,
  clearUserData,
}) => {
  const [signedIn, setSignedIn] = useState(isSignedIn);
  const [userData, setUserData] = useState(userDetails);
  const [loading, setLoading] = useState(true);

  const getNewStreakCount = async (userId) => {
    try {
      const res = await getUserDetails({ userId: userId });
      setUserData({ ...userData, totalStreak: res.data.users[0].totalStreak, totalPoints: res.data.users[0].totalPoints });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await getUserDetails({
            userId: user.uid,
          });
          setUserData(response.data.users[0]);
          setSignedIn(true);
        } catch (error) {
          console.error('Error fetching user details:', error);
          setUserData(null);
          setSignedIn(false);
        }
      } else {
        setUserData(null);
        setSignedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setSignedIn(isSignedIn);
    setUserData(userDetails);
  }, [userDetails, isSignedIn]);

  const logout = async () => {
    try {
      await signOut(auth);
      if (clearUserData) {
        clearUserData();
      }
      setSignedIn(false);
      setUserData(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    signedIn,
    setSignedIn,
    userData,
    setUserData,
    loading,
    logout,
    getNewStreakCount
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};