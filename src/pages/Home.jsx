import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useState, useEffect } from "react";
import { Button, Segmented, message, Empty, Badge } from "antd";
import {
  BellTwoTone,
  LogoutOutlined,
} from "@ant-design/icons";
import ChallengesCard from "../components/Cards/ChallengesCard";
import HabitsCard from "../components/Cards/HabitsCard";
import MoodPng from "../assets/Mood-png.png";
import { useAuth } from "../contexts/AuthProvider";
import { getUserHabit, deleteHabit, getHabitsWithUserDetails, unlockAchievement } from "@firebasegen/default-connector";
import { useNavigate } from "react-router-dom";
import AchievementPopup from "../components/AchievementPopup/AchievementPopup.jsx"; 

const Home = () => {
  const { logout, userData } = useAuth();
  const [userHabits, setUserHabits] = useState([]);
  const navigate = useNavigate();
  const [bronzePopupVisible, setBronzePopupVisible] = useState(false);

  // States for total points achievement popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({ badgeImage: "", title: "", message: "" });

  const fetchUserHabits = async () => {
    try {
      const data = await getHabitsWithUserDetails({ userId: userData.id });
      setUserHabits(data.data.user.userHabits_on_user);
    } catch (error) {
      message.error("Failed to fetch habits");
    }
  };

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
    const now = new Date(); // current time
    const givenTimestamp = new Date(timestamp); // convert the string timestamp to a Date object
    const oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in ms
    return now - givenTimestamp > oneDayInMs;
  }

  // --- Total Points Achievement Logic ---
  // Mapping thresholds for total points (for testing: 2, 5, 10)
  const POINTS_ACHIEVEMENTS = {
    2: "97a70902845e45d28cbc50702adec7e6",  // 2 Points Achieved
    5: "a3197b9ad87546f2b32ea4f22677b1f2",  // 5 Points Achieved
    10: "99f489d3729f409f8f764a25fe21702a", // 10 Points Achieved
  };

  useEffect(() => {
    if (userData && typeof userData.totalPoints === "number") {
      console.log("Checking total points:", userData.totalPoints);
      // Loop through each threshold. Here we trigger if the user's totalPoints exactly equals the threshold.
      Object.entries(POINTS_ACHIEVEMENTS).forEach(([thresholdStr, achievementId]) => {
        const threshold = Number(thresholdStr);
        if (userData.totalPoints === threshold) {
          unlockAchievement({ userId: userData.id, achievementId })
            .then(() => {
              message.success(`Unlocked achievement for reaching ${threshold} total points!`);
              setPopupData({
                badgeImage:
                  threshold === 2
                    ? "/badges/points_badge_bronze.png"
                    : threshold === 5
                    ? "/badges/points_badge_silver.png"
                    : "/badges/points_badge_gold.png",
                title: "Points Achievement Unlocked!",
                message: `You have reached ${threshold} total points!`
              });
              setPopupVisible(true);
            })
            .catch((err) => {
              console.error("Error unlocking points achievement:", err);
            });
        }
      });
    }
  }, [userData?.totalPoints]);

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
              Hi Mert 👋
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
      
      {/* Render Achievement Popup for Total Points Achievements */}
      <AchievementPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        badgeNumber={null}  // You can omit badge number or set a custom one if desired
        customMessage={popupData.message}
        title={popupData.title}
        badgeImage={popupData.badgeImage}
      />
    </div>
  );
};

export default Home;
