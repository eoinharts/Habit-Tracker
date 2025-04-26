import React, { useState, useEffect } from 'react';
import { Card, List, Button, Typography, Space, Tooltip, App } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { getHabitsWithUserDetails } from '../../dataconnect-generated/js/default-connector/esm/index.esm.js';
import { useAuth } from '../contexts/AuthProvider';
import { createLikeNotification } from '../utils/notifications';
import { addLike, removeLike, getLikesForHabits } from '../utils/likes';
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

        // Get like status for all habits
        if (userData?.id && habitsData.length > 0) {
          const habitIds = habitsData.map(h => h.id);
          console.log('🔍 Fetching like status for habits:', habitIds);
          const likeStatus = await getLikesForHabits(habitIds, userData.id);
          console.log('✅ Like status received:', likeStatus);
          habitsData.forEach(habit => {
            habit.liked = likeStatus[habit.id];
          });
          console.log('📝 Updated habits data:', habitsData);
        }

        setHabits(habitsData);
      } catch (err) {
        console.error('❌ Error loading habits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [userId, userData?.id]);

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
        try {
          await createLikeNotification(
            userId, // owner of the habit
            userData.id, // user who liked
            userData.name,
            habitId,
            habit.title
          );
        } catch (err) {
          console.error('Failed to create notification:', err);
          message.error('Failed to send notification');
        }
      }

      // Update like in Firestore
      try {
        console.log(`${newLikedState ? '❤️ Adding' : '💔 Removing'} like for habit:`, habitId);
        if (newLikedState) {
          await addLike(habitId, userId, userData.id);
        } else {
          await removeLike(habitId, userData.id);
        }
        console.log('✅ Like status updated in Firestore');
      } catch (err) {
        console.error('❌ Error updating like in Firestore:', err);
        throw err;
      }

    } catch (err) {
      console.error('❌ Error in handleLike:', err);
      message.error('Failed to update like status');
    }
  };



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