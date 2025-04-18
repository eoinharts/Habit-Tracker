import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useState, useEffect } from "react";
import { Button, Segmented, message, Empty, Badge } from "antd";
import { BellTwoTone, LogoutOutlined } from "@ant-design/icons";
import ChallengesCard from "../components/Cards/ChallengesCard";
import HabitsCard from "../components/Cards/HabitsCard";
import MoodPng from "../assets/Mood-png.png";
import { useAuth } from "../contexts/AuthProvider";
import {
  getUserHabit,
  deleteHabit,
  getHabitsWithUserDetails,
  unlockAchievement,
  listMyAchievements,
} from "@firebasegen/default-connector";
import { useNavigate } from "react-router-dom";
import AchievementPopup from "../components/AchievementPopup/AchievementPopup.jsx";


const Home = () => {
  const { logout, userData } = useAuth();
  const [userHabits, setUserHabits] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({ badgeImage: "", title: "", message: "" });
  const navigate = useNavigate();
  const [earnedAchievementIds, setEarnedAchievementIds] = useState([]);

  const fetchUserHabits = async () => {
    try {
      const data = await getHabitsWithUserDetails({ userId: userData.id });
      setUserHabits(data.data.user.userHabits_on_user);
    } catch (error) {
      message.error("Failed to fetch habits");
    }
  };
  useEffect(() => {
    const fetchAchievements = async () => {
      await waitForAuthReady(); // 👈 Ensure auth is ready
      if (!userData?.id) {
        console.warn("🚫 Skipping achievement fetch: no user ID");
        return;
      }
  
      try {
        console.log("🛰️ Fetching user achievements for ID:", userData.id);
        const response = await listMyAchievements(); // 👈 NO `where` clause!
        const unlocked = response?.data?.userAchievements || [];
        console.log("🎯 Response from listMyAchievements:", response);
        console.log("🟢 Unlocked achievements:", unlocked);
  
        const ids = unlocked.map(a => a.achievement?.id || a.achievement_id);
        setEarnedAchievementIds(ids);
      } catch (err) {
        console.error("❌ Failed to fetch achievements:", err);
      }
    };
  
    fetchAchievements();
  }, [userData?.id]);
  
  
  


  useEffect(() => {
    fetchUserHabits();
  }, []);

  const handleEdit = (habitId) => {
    navigate(`/edit-habit/${habitId}`);
  };

  const handleDelete = async (habitId) => {
    try {
      await deleteHabit({ habitId });
      message.success("Habit deleted successfully");
      fetchUserHabits(); // Refresh the list
    } catch (error) {
      message.error("Failed to delete habit");
    }
  };

  function hasExceededOneDay(timestamp) {
    const now = new Date();
    const givenTimestamp = new Date(timestamp);
    const oneDayInMs = 24 * 60 * 60 * 1000;
    return now - givenTimestamp > oneDayInMs;
  }

  // --- Achievement logic (total points only) ---
  const POINTS_ACHIEVEMENT_DATA = {
    2: {
      id: "97a70902845e45d28cbc50702adec7e6",
      badgeImage: "/badges/bronze_badge.png",
      title: "Bronze Beginner 🎉",
      message: "You’ve reached 2 total points! Great start!"
    },
    5: {
      id: "a3197b9ad87546f2b32ea4f22677b1f2",
      badgeImage: "/badges/silver_badge.png",
      title: "Silver Climber 🥈",
      message: "You’ve earned 5 points! Keep up the momentum!"
    },
    10: {
      id: "99f489d3729f409f8f764a25fe21702a",
      badgeImage: "/badges/gold_badge.png",
      title: "Golden Master 🏆",
      message: "Amazing! You've reached 10 total points!"
    }
  };

  useEffect(() => {
    const checkAndUnlockPointsAchievement = async () => {
      if (!userData?.id || typeof userData.totalPoints !== "number") return;
  
      // Wait until earnedAchievementIds has populated (even if empty array)
      if (!Array.isArray(earnedAchievementIds)) {
        console.log("⏳ Waiting for earnedAchievementIds to initialize");
        return;
      }
  
      const achievement = POINTS_ACHIEVEMENT_DATA[userData.totalPoints];
      if (!achievement) {
        console.log("ℹ️ No achievement defined for this point total:", userData.totalPoints);
        return;
      }
  
      // Prevent duplicate unlocks
      if (earnedAchievementIds.includes(achievement.id)) {
        console.log("⚠️ Already unlocked:", achievement.id);
        return;
      }
  
      try {
        const result = await unlockAchievement({
          userId: userData.id,
          achievementId: achievement.id,
        });
        console.log("🏆 Achievement unlocked:", result);
  
        // Add to local state to prevent future unlock attempts
        setEarnedAchievementIds(prev => [...prev, achievement.id]);
  
        // 🎉 Show the popup
        setPopupData({
          badgeImage: achievement.badgeImage,
          title: achievement.title,
          message: achievement.message,
        });
        setPopupVisible(true);
      } catch (err) {
        console.error("🔥 Error unlocking achievement:", err);
      }
    };
  
    checkAndUnlockPointsAchievement();
  }, [userData?.totalPoints, earnedAchievementIds]);

  return (
    <div>
      <div className="bg-white shadow-btm p-3">
        <div className="d-flex align-items-center justify-content-between">
          <Button onClick={() => alert("calendar action")} className="rounded-btn">
            <BellTwoTone style={{ fontSize: "18px" }} />
          </Button>
          <Button className="rounded-btn" onClick={logout}>
            <LogoutOutlined style={{ fontSize: "18px" }} />
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="mt-2">
            <Title level={4} style={{ fontWeight: "400" }} className="mb-0">
              Hi {userData.displayName || "there"} 👋
            </Title>
            <Text type="secondary d-block mb-2">Let's make habits together</Text>
          </div>
          <img src={MoodPng} alt="emoji" className="ms-2" style={{ width: "40px", height: "40px" }} />
        </div>
        <div className="d-flex">
          <div className="color-box-header d-inline-block p-2 me-2" style={{ backgroundColor: "#93d123" }}>
            <Title level={5} style={{ fontWeight: "500", color: "white" }} className="d-block mb-1">
              🥇 Points: &nbsp;<Badge count={userData.totalPoints} color="red" size={30} style={{ fontSize: "14px", width: "20px" }} />
            </Title>
          </div>
          <div className="color-box-header d-inline-block p-2" style={{ backgroundColor: "#FFC107" }}>
            <Title level={5} style={{ fontWeight: "500", color: "white" }} className="d-block mb-1">
              🔥 Streak: &nbsp;<Badge count={userData.totalStreak} showZero color="red" size={30} style={{ fontSize: "14px", width: "20px" }} />
            </Title>
          </div>
        </div>
      </div>
      <div className="px-3 pt-2">
        {userHabits.length > 0 ? (
          <>
            {userHabits.filter((habitDet) => hasExceededOneDay(habitDet.lastTrackedDate)).length > 0 && (
              <>
                <div className="d-flex align-items-center justify-content-between">
                  <Text strong className="d-block mb-1">Habits - To Do</Text>
                </div>
                {userHabits
                  .filter((habitDet) => hasExceededOneDay(habitDet.lastTrackedDate))
                  .map((habitDet) => (
                    <HabitsCard
                      key={habitDet.habit.id}
                      habitDet={habitDet}
                      isDone={false}
                      fetchUserHabits={fetchUserHabits}
                      onEdit={() => handleEdit(habitDet.habit.id)}
                      onDelete={() => handleDelete(habitDet.habit.id)}
                    />
                  ))}
              </>
            )}
            {userHabits.filter((habitDet) => !hasExceededOneDay(habitDet.lastTrackedDate)).length > 0 && (
              <>
                <div className="d-flex align-items-center justify-content-between">
                  <Text strong className="d-block mb-1">Habits - Done</Text>
                </div>
                {userHabits
                  .filter((habitDet) => !hasExceededOneDay(habitDet.lastTrackedDate))
                  .map((habitDet) => (
                    <HabitsCard
                      key={habitDet.habit.id}
                      habitDet={habitDet}
                      isDone={true}
                      fetchUserHabits={fetchUserHabits}
                      onEdit={() => handleEdit(habitDet.habit.id)}
                      onDelete={() => handleDelete(habitDet.habit.id)}
                    />
                  ))}
              </>
            )}
          </>
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <Empty description="No habits found, please create one" />
          </div>
        )}
      </div>

      {/* Achievement Popup */}
      <AchievementPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        badgeNumber={null}
        customMessage={popupData.message}
        title={popupData.title}
        badgeImage={popupData.badgeImage}
      />
    </div>
  );
};

export default Home;
