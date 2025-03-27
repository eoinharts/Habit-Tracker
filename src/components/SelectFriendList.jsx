import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, message } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import {
  getAllUsers,
  listFriends,
  addFriend,
  createUser,
  getUserDetails
} from '../../dataconnect-generated/js/default-connector/esm/index.esm.js';
import { auth } from '../utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const SelectFriendList = ({ onSuccess, onClose }) => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  const confirmUserInDB = async (uid) => {
    console.log('[⏳] Confirming user in DB:', uid);
    let retries = 10;
    while (retries-- > 0) {
      const check = await getUserDetails({ userId: uid });
      const found = check?.data?.users?.length > 0;
      console.log(`[🔎] Retry ${9 - retries}/10 - Found user in DB:`, found);
      if (found) return true;
      await new Promise(res => setTimeout(res, 500));
    }
    console.warn('[❌] User still not found in DB after retries');
    return false;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const uid = user.uid;
      setCurrentUserId(uid);

      try {
        const res = await getUserDetails({ userId: uid });
        const userExists = res?.data?.users?.length > 0;

        if (!userExists) {
          console.log('[🆕] Creating user...');
          await createUser({
            id: uid,
            name: user.displayName || 'No Name',
            email: user.email,
            totalStreak: 0
          });
        }

        const inserted = await confirmUserInDB(uid);
        if (!inserted) {
          console.warn('[⚠️] Retrying user insert once more...');
          await createUser({
            id: uid,
            name: user.displayName || 'No Name',
            email: user.email,
            totalStreak: 0
          });
          const retryInsert = await confirmUserInDB(uid);
          if (!retryInsert) {
            throw new Error('User creation not confirmed in DB after retry');
          }
        }

        console.log('✅ User ready in DB');

        const [usersRes, friendsRes] = await Promise.all([
          getAllUsers(),
          listFriends()
        ]);

        const allUsers = usersRes?.data?.users || [];
        const currentFriends = friendsRes?.data?.friendships || [];
        const friendIds = new Set(currentFriends.map(f => f.user2Id));

        const filteredUsers = allUsers.filter(u =>
          u.id !== uid && !friendIds.has(u.id)
        );

        setAvailableUsers(filteredUsers);
      } catch (err) {
        console.error('❌ Setup failed:', err);
        message.error('Something went wrong setting up your friends list.');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddFriend = async (friendId) => {
    try {
      const confirmed = await confirmUserInDB(currentUserId);
      if (!confirmed) throw new Error('Current user still not in DB');

      console.log('➕ Attempting to add friend:', friendId);
      await addFriend({ currentUserId, friendId });

      message.success('Friend added successfully!');
      onSuccess();
      onClose();
    } catch (err) {
      if (err?.message?.includes('duplicate key value')) {
        message.warning('You are already friends or have a pending request.');
      } else {
        console.error('Add friend error:', err);
        message.error('Failed to add friend.');
      }
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <List
      dataSource={availableUsers}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAddFriend(user.id)}
            >
              Add Friend
            </Button>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={user.name}
            description={user.email}
          />
        </List.Item>
      )}
      locale={{ emptyText: 'No available users to add' }}
    />
  );
};

export default SelectFriendList;
