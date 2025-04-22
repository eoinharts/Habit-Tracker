// ✅ FINALIZED Home.jsx with ALL Achievement Logic Centralized

import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useState, useEffect } from "react";
import { Button, message, Empty, Badge } from "antd";
import {
  BellTwoTone,
  LogoutOutlined,
} from "@ant-design/icons";
import ChallengesCard from "../components/Cards/ChallengesCard";
import HabitsCard from "../components/Cards/HabitsCard";
import MoodPng from "../assets/Mood-png.png";
import { useAuth } from "../contexts/AuthProvider";
import {
  getHabitsWithUserDetails,
  deleteHabit,
  unlockAchievement,
  listUserAchievements,
} from "@firebasegen/default-connector";
import { useNavigate } from "react-router-dom";
import AchievementPopup from "../components/AchievementPopup/AchievementPopup.jsx";

const Home = () => {
  const { logout, userData } = useAuth();
  const navigate = useNavigate();

  const [userHabits, setUserHabits] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const fetchUserHabits = async () => {
    try {
      const data = await getHabitsWithUserDetails({ userId: userData.id });
      setUserHabits(data.data.user.userHabits_on_user);
    } catch (err) {
      console.error("Error fetching habits:", err);
      message.error("Failed to load habits.");
    }
  };

  const fetchAchievements = async () => {
    try {
      const res = await listUserAchievements({ userId: userData.id });
      const unlockedIds = res.data.userAchievements.map((ua) => ua.achievement.id);
      setUserAchievements(unlockedIds);
    } catch (err) {
      console.error("Error fetching achievements:", err);
    }
  };

  const hasUnlocked = (id) => userAchievements.includes(id);

  const showPopup = (id, title, messageText, badgeImage) => {
    if (!localStorage.getItem(`popupShown_${id}`)) {
      setPopupData({ title, message: messageText, badgeImage });
      setPopupVisible(true);
      localStorage.setItem(`popupShown_${id}`, "true");
    }
  };

  const unlockIfNeeded = (id, conditionMet, title, messageText, badgeImage) => {
    if (!conditionMet) return;

    const alreadyUnlocked = hasUnlocked(id);

    if (!alreadyUnlocked) {
      unlockAchievement({ userId: userData.id, achievementId: id })
        .then(() => {
          console.log(`✅ Unlocked ${title}`);
          setPopupData({ title, message: messageText, badgeImage });
          setPopupVisible(true);
          // No need for localStorage anymore
        })
        .catch((err) => {
          if (
            err.message?.includes("duplicate key value") ||
            err.message?.includes("already exists")
          ) {
            console.warn(`⚠️ ${id} already unlocked. Popup will NOT show again.`);
            // Do nothing — popup won't show for previously unlocked ones
          } else {
            console.error("Error unlocking achievement:", err);
          }
        });
    }
  };





  const ACHIEVEMENTS = [
    // POINTS
    {
      id: "97a70902845e45d28cbc50702adec7e6",
      threshold: 2,
      type: "points",
      title: "Great Start! 🎉",
      message: "2 points earned!!",
      badge: "/badges/bronze_badge.png",
    },
    {
      id: "a3197b9ad87546f2b32ea4f22677b1f2",
      threshold: 5,
      type: "points",
      title: "Keep up the momentum!🔥",
      message: "5 points earned!",
      badge: "/badges/silver_badge.png",
    },
    {
      id: "99f489d3729f409f8f764a25fe21702a",
      threshold: 10,
      type: "points",
      title: "You're unstoppable! 💪",
      message: "10 points earned!",
      badge: "/badges/gold_badge.png",
    },
    // GOOD HABITS
    {
      id: "d617ec69b4434be1b73acd7866172dff",
      threshold: 1,
      type: "good",
      title: "1st Good Habit",
      message: "Your good habit journey begins!",
      badge: "/badges/bronze_badge.png",
    },
    {
      id: "f51ef17a74614193ba6d45d89b67b7b5",
      threshold: 5,
      type: "good",
      title: "5 Good Habits",
      message: "You're doing amazing!",
      badge: "/badges/silver_badge.png",
    },
    {
      id: "4489c9eba9a7489ca5b2e8631d08f054",
      threshold: 10,
      type: "good",
      title: "10 Good Habits",
      message: "Good Habit Master!",
      badge: "/badges/gold_badge.png",
    },
    // BAD HABITS
    {
      id: "6808cc372cee4b7e99009615e44103bd",
      threshold: 1,
      type: "bad",
      title: "Logged 1 Bad Habit",
      message: "First step to a better you!",
      badge: "/badges/bronze_badge.png",
    },
    {
      id: "d51da255e6f94da4a42f333ac97b5d9e",
      threshold: 5,
      type: "bad",
      title: "5 Bad Habits Logged",
      message: "Breaking chains!",
      badge: "/badges/silver_badge.png",
    },
    {
      id: "4bc71f655a3e4eb4bb0c4e88450e6ede",
      threshold: 10,
      type: "bad",
      title: "10 Bad Habits Logged",
      message: "Crushing it!",
      badge: "/badges/gold_badge.png",
    },
  ];

  useEffect(() => {
    fetchUserHabits();
    fetchAchievements();
  }, []);

  useEffect(() => {
    if (!userData) return;
    // 🎉 Show signed-up popup (only once per user)
    if (!localStorage.getItem("signedUpPopupShown")) {
      setTimeout(() => {
        setPopupData({
          title: "Welcome Aboard! 🚀",
          message: "You've officially signed up and started your habit journey!",
          badgeImage: "/badges/blue_badge.png",
        });
        setPopupVisible(true);
        localStorage.setItem("signedUpPopupShown", "true");
      }, 800); // Optional delay for a smoother feel
    }

    const totalPoints = userData.totalPoints;
    const goodCount = userHabits.filter((h) => h.habit.category === "Good Habit").length;
    const badCount = userHabits.filter((h) => h.habit.category === "Bad Habit").length;

    ACHIEVEMENTS.forEach(({ id, type, threshold, title, message, badge }) => {
      const valueToCheck =
        type === "points" ? totalPoints :
          type === "good" ? goodCount :
            type === "bad" ? badCount : 0;
      unlockIfNeeded(id, valueToCheck >= threshold, title, message, badge);
    });
  }, [userData, userHabits]);

  const handleEdit = (habitId) => navigate(`/edit-habit/${habitId}`);

  const handleDelete = async (habitId) => {
    try {
      await deleteHabit({ habitId });
      message.success("Habit deleted successfully");
      fetchUserHabits();
    } catch (error) {
      message.error("Failed to delete habit");
    }
  };

  const hasExceededOneDay = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    return now - then > 86400000;
  };

  return (
    <div>
      <div className="bg-white shadow-btm p-3">
        <div className="container">
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
                Hi {userData?.name || "there"} 👋
              </Title>
              <Text type="secondary d-block mb-2">Let's make habits together</Text>
            </div>
            <img src={MoodPng} alt="emoji" className="ms-2" style={{ width: "40px", height: "40px" }} />
          </div>
          <div className="d-flex">
            <div className="color-box-header d-inline-block p-2 me-2" style={{ backgroundColor: "#93d123" }}>
              <Title level={5} style={{ fontWeight: "500", color: "white" }} className="d-block mb-1">
                🥇 Points: &nbsp;<Badge count={userData.totalPoints} showZero color="red" size={30} style={{ fontSize: "14px", width: "20px" }} />
              </Title>
            </div>
            <div className="color-box-header d-inline-block p-2" style={{ backgroundColor: "#FFC107" }}>
              <Title level={5} style={{ fontWeight: "500", color: "white" }} className="d-block mb-1">
                🔥 Streak: &nbsp;<Badge count={userData.totalStreak} showZero color="red" size={30} style={{ fontSize: "14px", width: "20px" }} />
              </Title>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pt-2 container">
        {userHabits.length > 0 ? (
          <>
            {userHabits.filter((h) => hasExceededOneDay(h.lastTrackedDate)).length > 0 && (
              <>
                <Text strong className="d-block mb-1">Habits - To Do</Text>
                <div className="row">
                  {userHabits.filter((h) => hasExceededOneDay(h.lastTrackedDate)).map((h) => (
                    <div className="col-12 col-lg-4 col-md-6">
                      <HabitsCard key={h.habit.id} habitDet={h} isDone={false} fetchUserHabits={fetchUserHabits} onEdit={() => handleEdit(h.habit.id)} onDelete={() => handleDelete(h.habit.id)} />
                    </div>
                  ))}
                </div>
              </>
            )}
            {userHabits.filter((h) => !hasExceededOneDay(h.lastTrackedDate)).length > 0 && (
              <>
                <Text strong className="d-block mb-1">Habits - Done</Text>
                <div className="row">
                  {userHabits.filter((h) => !hasExceededOneDay(h.lastTrackedDate)).map((h) => (
                    <div className="col-12 col-lg-4 col-md-6">
                      <HabitsCard key={h.habit.id} habitDet={h} isDone={true} fetchUserHabits={fetchUserHabits} onEdit={() => handleEdit(h.habit.id)} onDelete={() => handleDelete(h.habit.id)} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <Empty description="No habits found, please create one" />
          </div>
        )}
      </div>

      {popupData && (
        <AchievementPopup
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
          title={popupData.title}
          message={popupData.message}
          badgeImage={popupData.badgeImage}
        />
      )}
    </div>
  );
};

export default Home;
