import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Avatar, List, Badge, Button, message, Popconfirm, Modal, Space } from 'antd';
import { auth } from '../utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  getUserDetails,
  listFriends,
  removeFriend,
  acceptFriendRequest,
  declineFriendRequest,
  debugFriendships
} from '../../dataconnect-generated/js/default-connector/esm/index.esm.js';

import { ArrowLeftOutlined, DeleteOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import SelectFriendList from '../components/SelectFriendList';
import SelectAchievementList from '../components/SelectAchievementList';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState({ accepted: [], pending: [] });
  const [achievements, setAchievements] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async (userId) => {
    try {
      const [debugRes, userDetailsRes] = await Promise.all([
        debugFriendships(),
        getUserDetails({ userId })
      ]);

      const userData = userDetailsRes?.data?.users?.[0] || {};
      const allDebug = debugRes?.data?.friendships || [];

      const accepted = await Promise.all(
        allDebug
          .filter(f => f.status === 'accepted' && (f.user1Id === userId || f.user2Id === userId))
          .map(async (f) => {
            const isUser1 = f.user1Id === userId;
            const friendId = isUser1 ? f.user2Id : f.user1Id;
            const detailsRes = await getUserDetails({ userId: friendId });
            const friendUser = detailsRes?.data?.users?.[0];

            return {
              ...f,
              id: friendId,
              friendDetails: friendUser || { id: friendId, email: 'unknown' }
            };
          })
      );

      const pending = await Promise.all(
        allDebug
          .filter(f => f.status === 'pending' && (f.user1Id === userId || f.user2Id === userId))
          .map(async f => {
            const isReceived = f.user2Id === userId;
            const friendId = isReceived ? f.user1Id : f.user2Id;
            const detailsRes = await getUserDetails({ userId: friendId });
            const friendUser = detailsRes?.data?.users?.[0];

            return {
              ...f,
              isIncoming: isReceived,
              friendDetails: friendUser || { id: friendId, email: 'unknown' },
              id: friendId
            };
          })
      );

      setFriends({ accepted, pending });
      setAchievements(userData.achievements || []);
      setUserPoints(userData.points || 0);
    } catch (err) {
      console.error("❌ Error loading profile:", err);
      message.error("Failed to load profile data");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/auth');
      } else {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend({ friendId });
      await fetchUserData(user.uid);
      message.success('Friend removed');
    } catch (err) {
      console.error(err);
      message.error('Could not remove friend');
    }
  };

  const handleAcceptFriend = async (friendId) => {
    const user1Id = friendId;
    const user2Id = user?.uid;
    try {
      await acceptFriendRequest({ user1Id, user2Id });
      await fetchUserData(user.uid);
      message.success('Friend request accepted');
    } catch (err) {
      console.error('🔥 acceptFriendRequest failed:', err);
      message.error('Failed to accept request');
    }
  };

  const handleDeclineFriend = async (friendId) => {
    const user1Id = friendId;
    const user2Id = user?.uid;
    try {
      await declineFriendRequest(undefined, { user1Id, user2Id });
      await fetchUserData(user.uid);
      message.success('Friend request declined');
    } catch (err) {
      console.error('🔥 declineFriendRequest failed:', err);
      message.error('Failed to decline request');
    }
  };

  if (loading) return <div>Loading...</div>;

  const items = [
    {
      key: '1',
      label: 'Friends',
      children: (
        <>
          <Button onClick={() => setShowFriendsModal(true)} type="primary" style={{ marginBottom: 16 }}>Add Friends</Button>
          <List
            dataSource={friends.accepted}
            renderItem={friend => (
              <List.Item
                actions={[
                  <Button icon={<EyeOutlined />} onClick={() => navigate(`/friend/${friend.id}`)}>View</Button>,
                  <Popconfirm title="Remove this friend?" onConfirm={() => handleRemoveFriend(friend.id)}>
                    <Button icon={<DeleteOutlined />} danger />
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={friend.friendDetails?.email || friend.friendDetails?.id || 'Unknown'}
                />
              </List.Item>
            )}
            locale={{ emptyText: 'No friends' }}
          />
        </>
      )
    },
    {
      key: '2',
      label: 'Pending Requests',
      children: (
        <List
          dataSource={friends.pending}
          renderItem={friend => (
            <List.Item
              actions={
                friend.isIncoming
                  ? [
                    <Button type="primary" onClick={() => handleAcceptFriend(friend.id)}>Accept</Button>,
                    <Button danger onClick={() => handleDeclineFriend(friend.id)}>Decline</Button>
                  ]
                  : null
              }
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={friend.friendDetails?.email || friend.id}
                description={friend.isIncoming ? 'Sent you a request' : 'Request sent'}
              />
            </List.Item>
          )}
          locale={{ emptyText: 'No pending requests' }}
        />
      )
    }
  ];

  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        {/* Navigation + Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={4} style={{ margin: 0 }}>Your Profile</Title>
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>Back to Home</Button>
            <Button type="primary" onClick={() => navigate('/habit-home')}>Go to habits</Button>
          </Space>
        </div>

        {/* Profile Card */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '24px',
          background: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <Avatar size={80} src={user?.photoURL} icon={!user?.photoURL && <UserOutlined />} style={{ marginBottom: '12px' }} />
          <Title level={4} style={{ margin: 0 }}>{user?.displayName || user?.email}</Title>
          <Text type="secondary">{user?.email}</Text>
          <Badge count={userPoints} overflowCount={999} style={{ backgroundColor: '#3B82F6', marginTop: '8px' }}>
            <Text style={{ marginLeft: '8px' }}>Total Points</Text>
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs defaultActiveKey="1" items={items} style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }} />
      </div>

      {/* Modals */}
      <Modal title="Add Friends" open={showFriendsModal} onCancel={() => setShowFriendsModal(false)} footer={null} width={600}>
        <SelectFriendList userId={user?.uid} onSuccess={() => { fetchUserData(user.uid); setShowFriendsModal(false); }} onClose={() => setShowFriendsModal(false)} />
      </Modal>

      <Modal title="Add Achievements" open={showAchievementsModal} onCancel={() => setShowAchievementsModal(false)} footer={null} width={600}>
        <SelectAchievementList userId={user?.uid} onSuccess={() => { fetchUserData(user.uid); setShowAchievementsModal(false); }} onClose={() => setShowAchievementsModal(false)} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
