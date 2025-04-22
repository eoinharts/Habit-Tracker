// ✅ FINALIZED Home.jsx with ALL Achievement Logic Centralized

import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useState, useEffect } from "react";
import { Button, Empty, Badge, List, Typography, Popover, App } from "antd";
import {
  BellTwoTone,
  LogoutOutlined,
  DeleteOutlined,
  ClearOutlined
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
} from "../../dataconnect-generated/js/default-connector/esm/index.esm.js";
import { useNavigate } from "react-router-dom";
import AchievementPopup from "../components/AchievementPopup/AchievementPopup.jsx";

const Home = () => {
  const { logout, userData } = useAuth();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [userHabits, setUserHabits] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const processingRef = React.useRef(new Set());

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

  const unlockIfNeeded = async (id, conditionMet, title, messageText, badgeImage) => {
    if (!conditionMet) return;
    
    try {
      // Check if we're already processing this achievement
      if (processingRef.current.has(id)) {
        console.log(`Already processing achievement ${id}`);
        return;
      }
      
      // Mark this achievement as being processed
      processingRef.current.add(id);
      
      try {
        // First check if it's already unlocked
        const achievements = await listUserAchievements({ userId: userData.id });
        const unlockedIds = achievements.data.userAchievements.map((ua) => ua.achievement.id);
        
        if (unlockedIds.includes(id)) {
          console.log(`Achievement ${id} is already unlocked`);
          return;
        }

        // Try to unlock the achievement
        await unlockAchievement({ userId: userData.id, achievementId: id });
        console.log(`✅ Unlocked ${title}`);

        // Only show popup if it hasn't been shown before
        if (!localStorage.getItem(`popupShown_${id}`)) {
          setPopupData({ title, message: messageText, badgeImage });
          setPopupVisible(true);
          localStorage.setItem(`popupShown_${id}`, "true");
        }

        // Update achievements list
        setUserAchievements(prev => [...prev, id]);
      } catch (err) {
        // If it's a duplicate key error, just ignore it
        if (err.message?.includes("duplicate key value") || 
            err.message?.includes("already exists")) {
          console.log(`Achievement ${title} was already unlocked`);
          return;
        }
        throw err; // Re-throw other errors
      }
    } catch (err) {
      console.error("Error unlocking achievement:", err);
    } finally {
      // Remove this achievement from the processing set
      processingRef.current.delete(id);
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

  const loadNotifications = async () => {
    if (!userData?.id) return;

    try {
      // Load notifications from localStorage
      const localStorageNotifications = JSON.parse(localStorage.getItem('habitNotifications') || '[]');
      
      // Filter notifications for the current user
      const userNotifications = localStorageNotifications
        .filter(n => n.toUserId === userData.id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      setNotifications(userNotifications);
    } catch (err) {
      console.error('Error loading notifications:', err);
    }
  };

  const handleDeleteNotification = (notificationId) => {
    try {
      const allNotifications = JSON.parse(localStorage.getItem('habitNotifications') || '[]');
      const updatedNotifications = allNotifications.filter(n => n.id !== notificationId);
      localStorage.setItem('habitNotifications', JSON.stringify(updatedNotifications));
      loadNotifications();
      message.success('Notification deleted');
    } catch (err) {
      console.error('Error deleting notification:', err);
      message.error('Failed to delete notification');
    }
  };

  const handleClearAllNotifications = () => {
    try {
      const allNotifications = JSON.parse(localStorage.getItem('habitNotifications') || '[]');
      const otherUsersNotifications = allNotifications.filter(n => n.toUserId !== userData.id);
      localStorage.setItem('habitNotifications', JSON.stringify(otherUsersNotifications));
      loadNotifications();
      setHasNewNotifications(false);
      message.success('All notifications cleared');
    } catch (err) {
      console.error('Error clearing notifications:', err);
      message.error('Failed to clear notifications');
    }
  };

  useEffect(() => {
    fetchUserHabits();
    fetchAchievements();
  }, []);

  useEffect(() => {
    if (!userData) return;
    if (!localStorage.getItem("signedUpPopupShown")) {
      setTimeout(() => {
        setPopupData({
          title: "Welcome Aboard! 🚀",
          message: "You've officially signed up and started your habit journey!",
          badgeImage: "/badges/blue_badge.png",
        });
        setPopupVisible(true);
        localStorage.setItem("signedUpPopupShown", "true");
      }, 800);
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

  // Listen for new notifications
  const handleNewNotification = (event) => {
    const { notification } = event.detail;
    if (notification.toUserId === userData?.id) {
      setHasNewNotifications(true);
      message.info("You have a new notification! 🔔");
      loadNotifications(); // Reload notifications from localStorage
    }
  };

  useEffect(() => {
    if (userData?.id) {
      fetchUserHabits();
      fetchAchievements();
      loadNotifications();

      // Add event listener for new notifications
      window.addEventListener('newNotification', handleNewNotification);

      // Cleanup
      return () => {
        window.removeEventListener('newNotification', handleNewNotification);
      };
    }
  }, [userData?.id]);

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

  const NotificationsList = () => (
    <List
      style={{ maxWidth: '300px', maxHeight: '400px', overflow: 'auto' }}
      size="small"
      header={
        <div className="d-flex justify-content-between align-items-center">
          <Typography.Text strong>Notifications</Typography.Text>
          {notifications.length > 0 && (
            <Button
              type="text"
              icon={<ClearOutlined />}
              size="small"
              onClick={() => {
                handleClearAllNotifications();
              }}
            >
              Clear all
            </Button>
          )}
        </div>
      }
      locale={{ emptyText: 'No notifications' }}
      dataSource={notifications}
      renderItem={(notification) => (
        <List.Item
          actions={[
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDeleteNotification(notification.id)}
            />
          ]}
        >
          <List.Item.Meta
            title={notification.message}
            description={
              <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                {new Date(notification.timestamp).toLocaleString()}
              </Typography.Text>
            }
          />
        </List.Item>
      )}
    />
  );

  return (
    <div>
      <div className="bg-white shadow-btm p-3">
        <div className="d-flex align-items-center justify-content-between">
          <Popover 
            content={<NotificationsList />}
            trigger="click"
            placement="bottomLeft"
            onOpenChange={(visible) => {
              if (visible) {
                setHasNewNotifications(false);
                loadNotifications();
              }
            }}
          >
            <Button className="rounded-btn">
              <Badge dot={hasNewNotifications}>
                <BellTwoTone style={{ fontSize: "18px" }} />
              </Badge>
            </Button>
          </Popover>
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
            {userHabits.filter((h) => hasExceededOneDay(h.lastTrackedDate)).length > 0 && (
              <>
                <Text strong className="d-block mb-1">Habits - To Do</Text>
                {userHabits.filter((h) => hasExceededOneDay(h.lastTrackedDate)).map((h) => (
                  <HabitsCard key={h.habit.id} habitDet={h} isDone={false} fetchUserHabits={fetchUserHabits} onEdit={() => handleEdit(h.habit.id)} onDelete={() => handleDelete(h.habit.id)} />
                ))}
              </>
            )}
            {userHabits.filter((h) => !hasExceededOneDay(h.lastTrackedDate)).length > 0 && (
              <>
                <Text strong className="d-block mb-1">Habits - Done</Text>
                {userHabits.filter((h) => !hasExceededOneDay(h.lastTrackedDate)).map((h) => (
                  <HabitsCard key={h.habit.id} habitDet={h} isDone={true} fetchUserHabits={fetchUserHabits} onEdit={() => handleEdit(h.habit.id)} onDelete={() => handleDelete(h.habit.id)} />
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
