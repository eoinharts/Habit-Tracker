import React, { useState, useEffect } from 'react';
import { Card, List, Button, Typography, Space, Tooltip, App } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { getHabitsWithUserDetails } from '../../dataconnect-generated/js/default-connector/esm/index.esm.js';
import { useAuth } from '../contexts/AuthProvider';
import './FriendHabits.css';

const { Text } = Typography;

const FriendHabits = ({ userId }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();
  const { message } = App.useApp();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await getHabitsWithUserDetails({ userId });
        console.log('Fetched habits for user:', userId, res?.data?.user);
        const userHabits = res?.data?.user?.userHabits_on_user || [];
        const habitsData = userHabits.map(uh => ({
          id: uh.habit.id,
          title: uh.habit.title,
          description: uh.habit.description,
          streak: uh.currentStreak,
          category: uh.habit.category,
          emoji: uh.habit.emoji,
          liked: false
        }));
        setHabits(habitsData);
      } catch (err) {
        console.error('❌ Error loading habits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [userId]);

  const handleLike = async (habitId) => {
    try {
      // Ensure we have user data
      if (!userData?.id) {
        console.error('No user data available');
        message.error('Please log in to like habits');
        return;
      }

      const habit = habits.find(h => h.id === habitId);
      if (!habit) {
        console.error('Habit not found');
        return;
      }

      console.log('Liking habit:', { habitId, habit, fromUserId: userData.id, toUserId: userId });

      // Toggle like state
      const newLikedState = !habit.liked;
      
      // Update local state
      setHabits(prevHabits => 
        prevHabits.map(h => 
          h.id === habitId 
            ? { ...h, liked: newLikedState }
            : h
        )
      );

      // Only create notification when liking, not unliking
      if (newLikedState) {
        // Store notification in localStorage
        const notifications = JSON.parse(localStorage.getItem('habitNotifications') || '[]');
        const newNotification = {
          id: Date.now(),
          message: `${userData.name} liked your habit "${habit.title}"`,
          timestamp: new Date().toISOString(),
          habitId: habitId,
          fromUserId: userData.id,
          toUserId: userId,
          type: 'like'
        };
        
        notifications.push(newNotification);
        localStorage.setItem('habitNotifications', JSON.stringify(notifications));

        // Trigger a custom event to notify the Home component
        window.dispatchEvent(new CustomEvent('newHabitNotification', { 
          detail: { notification: newNotification }
        }));
      }

      // Store like state
      const likedHabits = JSON.parse(localStorage.getItem('likedHabits') || '{}');
      if (newLikedState) {
        if (!likedHabits[userId]) {
          likedHabits[userId] = [];
        }
        if (!likedHabits[userId].includes(habitId)) {
          likedHabits[userId].push(habitId);
        }
      } else {
        if (likedHabits[userId]) {
          likedHabits[userId] = likedHabits[userId].filter(id => id !== habitId);
        }
      }
      localStorage.setItem('likedHabits', JSON.stringify(likedHabits));

      // Remove the success message popup
      // message.success(newLikedState ? 'Habit liked!' : 'Habit unliked');
    } catch (err) {
      console.error('❌ Error in handleLike:', err);
      message.error('Failed to update like status');
    }
  };

  // Load liked state from localStorage on component mount
  useEffect(() => {
    const likedHabits = JSON.parse(localStorage.getItem('likedHabits') || '{}');
    const userLikedHabits = likedHabits[userId] || [];
    
    if (userLikedHabits.length > 0) {
      setHabits(prevHabits => 
        prevHabits.map(habit => ({
          ...habit,
          liked: userLikedHabits.includes(habit.id)
        }))
      );
    }
  }, [userId]);

  if (loading) return <div>Loading habits...</div>;

  return (
    <div className="friend-habits-container">
      <Card 
        title="Habits"
        styles={{
          body: { padding: '24px' }
        }}
      >
        <List
          className="friend-habits-list"
          dataSource={habits}
          renderItem={(habit) => (
            <List.Item
              actions={[
                <Tooltip title={habit.liked ? "Unlike" : "Like"}>
                  <Button
                    type="text"
                    icon={habit.liked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                    onClick={() => handleLike(habit.id)}
                  />
                </Tooltip>
              ]}
            >
              <List.Item.Meta
                title={
                  <Space>
                    {habit.emoji && <span>{habit.emoji}</span>}
                    <span>{habit.title}</span>
                  </Space>
                }
                description={
                  <Space direction="vertical">
                    <Text>{habit.description}</Text>
                    <Text type="secondary">Streak: {habit.streak || 0} days</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default FriendHabits; 