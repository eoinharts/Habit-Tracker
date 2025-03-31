import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Layout, message, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { getUserHabit } from "@firebasegen/default-connector";

// Import pages
import WelcomePage from "../pages/WelcomePage";
import Home from "../pages/Home";
import Components from "../pages/Components";
import ProfilePage from "../pages/ProfilePage";
import FriendPage from "../pages/FriendPage";
import HabitHomePage from "../pages/HabitHomePage";
import CreateHabit from "../pages/Habit/CreateHabit";

// Import components

export default function AuthenticatedRoutes() {
  const { userData, signedIn, logout } = useAuth(); // Get user information
  const { pathname } = useLocation(); // Get current path
  const [habits, setHabits] = useState([]); // State to store habits
  const [apiLoading, setapiLoading] = useState(false);


  const fetchUserHabits = async () => {
    setapiLoading(true);
    try {
      const data = await getUserHabit({ uid: userData.id});
      setHabits(data);
    } catch (error) {
      message.error("Failed to fetch applications");
    } finally {
      setapiLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!userData.id) return;
  //   fetchUserHabits();
  // }, [userData.id]);
  return (
    <>
      {userData?.id ? (
        <>
          <Routes>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<Components />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/friend/:friendId" element={<FriendPage />} />
            <Route path="/habit-home" element={<HabitHomePage />} />
            <Route path="/create-habit" element={<CreateHabit />} />
          </Routes>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spin size="large" />
        </div>
      )}
    </>
  );
}
