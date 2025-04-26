import React, { useState, useEffect } from 'react';
import { Card, List, Button, Typography, Space, Tooltip, Input, Modal } from 'antd';
import { HeartOutlined, HeartFilled, MessageOutlined } from '@ant-design/icons';
import { listUserHabits } from '../../dataconnect-generated/js/default-connector/esm/index.esm.js';
import { useAuth } from '../../contexts/AuthProvider';
import './FriendHabits.css';

const { Text } = Typography;

const FriendHabits = ({ userId }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [messageText, setMessageText] = useState('');
  const { userData } = useAuth();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await listUserHabits({ userId });
        const habitsData = res?.data?.userHabits || [];
        setHabits(habitsData);
      } catch (err) {
        console.error('❌ Error loading habits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [userId]);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    // Create a notification for the friend
    const newNotification = {
      id: Date.now().toString(),
      title: 'New Message!',
      message: `${userData?.name || 'Someone'} sent you a message: "${messageText}"`,
      timestamp: new Date().toISOString(),
      type: 'message',
      toUserId: userId,
      fromUserId: userData?.id
    };

    // Get existing notifications from localStorage
    const existingNotifications = JSON.parse(localStorage.getItem('habitNotifications') || '[]');
    
    // Add new notification to the beginning of the array
    const updatedNotifications = [newNotification, ...existingNotifications];
    
    // Save back to localStorage
    localStorage.setItem('habitNotifications', JSON.stringify(updatedNotifications));

    // Dispatch custom event to notify the Home component
    const event = new CustomEvent('newNotification', { 
      detail: { notification: newNotification }
    });
    window.dispatchEvent(event);

    // Reset and close modal
    setMessageText('');
    setMessageModalVisible(false);
  };

  const handleLike = async (habitId) => {
    // Find the habit that was liked
    const likedHabit = habits.find(h => h.id === habitId);
    if (!likedHabit) return;

    // Update local state to show the like
    setHabits(prev => prev.map(habit => 
      habit.id === habitId ? { ...habit, liked: !habit.liked } : habit
    ));

    // Create a notification for the habit owner
    const newNotification = {
      id: Date.now().toString(),
      title: 'New Like!',
      message: `${userData?.name || 'Someone'} liked your habit "${likedHabit.title}"`,
      timestamp: new Date().toISOString(),
      type: 'like',
      toUserId: userId // This is the habit owner's ID
    };

    // Get existing notifications from localStorage
    const existingNotifications = JSON.parse(localStorage.getItem('habitNotifications') || '[]');
    
    // Add new notification to the beginning of the array
    const updatedNotifications = [newNotification, ...existingNotifications];
    
    // Save back to localStorage
    localStorage.setItem('habitNotifications', JSON.stringify(updatedNotifications));

    // Dispatch custom event to notify the Home component
    const event = new CustomEvent('newNotification', { 
      detail: { notification: newNotification }
    });
    window.dispatchEvent(event);
  };

  if (loading) return <div>Loading habits...</div>;

  return (
    <div className="friend-habits-container">
      <Card 
        title="Habits"
        extra={
          <Tooltip title="Send Message">
            <Button 
              type="text" 
              icon={<MessageOutlined />} 
              onClick={() => setMessageModalVisible(true)}
            />
          </Tooltip>
        }
      >
        <List
          className="friend-habits-list"
          dataSource={habits}
          renderItem={(habit) => (
            <List.Item
              actions={[
                <Tooltip title="Like">
                  <Button
                    type="text"
                    icon={habit.liked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                    onClick={() => handleLike(habit.id)}
                  />
                </Tooltip>
              ]}
            >
              <List.Item.Meta
                title={habit.title}
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

      <Modal
        title="Send Message"
        open={messageModalVisible}
        onOk={sendMessage}
        onCancel={() => {
          setMessageModalVisible(false);
          setMessageText('');
        }}
        okText="Send"
      >
        <Input.TextArea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message here..."
          rows={4}
        />
      </Modal>
    </div>
  );
};

export default FriendHabits;