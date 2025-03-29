import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, message } from 'antd';
import { UserOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  getAllUsers,
  deleteFriend, // Updated import: using deleteFriend instead of removeFriend
  removeReverseFriend,
  addFriend,
  createUser,
  getUserDetails,
  debugFriendships
} from '../../dataconnect-generated/js/default-connector/esm/index.esm.js';
import { auth } from '../utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const SelectFriendList = ({ onSuccess, onClose }) => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [allFriendships, setAllFriendships] = useState([]);

  const confirmUserInDB = async (uid) => {
    console.log('[⏳] Confirming user in DB:', uid);
    let retries = 10;
    while (retries-- > 0) {
      const check = await getUserDetails({ userId: uid });
      const found = check?.data?.users?.length > 0;
      console.log(`[🔎] Retry ${10 - retries}/10 - Found user in DB:`, found);
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

        const [usersRes, friendshipsRes] = await Promise.all([
          getAllUsers(),
          debugFriendships()
        ]);

        const allUsers = usersRes?.data?.users || [];
        const friendships = friendshipsRes?.data?.friendships || [];
        setAllFriendships(friendships);

        setAvailableUsers(allUsers.filter(u => u.id !== uid));
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
      const result = await addFriend({ currentUserId, friendId });
      console.log('✅ Friend mutation result:', result);
      if (result?.data) {
        message.success('Friend request sent (pending)!');
        onSuccess();
        onClose();
      } else {
        message.warning('No response from friend request mutation');
      }
    } catch (err) {
      console.error('Add friend error:', err);
      if (err?.message?.includes('duplicate key value')) {
        message.warning('You’ve already sent this request or are already friends.');
      } else {
        message.error('Friend request failed.');
      }
    }
  };

  const refreshFriendList = async () => {
    try {
      const [usersRes, friendshipsRes] = await Promise.all([
        getAllUsers(),
        debugFriendships()
      ]);
      const allUsers = usersRes?.data?.users || [];
      const friendships = friendshipsRes?.data?.friendships || [];
      setAllFriendships(friendships);
      setAvailableUsers(allUsers.filter(u => u.id !== currentUserId));
    } catch (e) {
      console.error('🔁 Failed to refresh friend list:', e);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    console.log('🗑️ Attempting to remove friend:', friendId);
    try {
      // Use deleteFriend mutation with both currentUserId and friendId
      const result1 = await deleteFriend({ currentUserId, friendId });
      console.log('✅ Removed (attempt #1):', result1);
      message.success('Friend removed');
      await refreshFriendList();
      onSuccess();
    } catch (err1) {
      console.warn('↩️ Failed on attempt #1, trying reverse:', err1);
      try {
        const result2 = await removeReverseFriend({ friendId });
        console.log('✅ Removed (attempt #2):', result2);
        message.success('Friend removed');
        await refreshFriendList();
        onSuccess();
      } catch (err2) {
        console.error('❌ Remove failed both directions:', err2);
        message.error('Could not remove friend');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <List
      dataSource={availableUsers}
      renderItem={(user) => {
        const isFriend = allFriendships.some(f =>
          f.status === 'accepted' &&
          ((f.user1Id === currentUserId && f.user2Id === user.id) ||
           (f.user2Id === currentUserId && f.user1Id === user.id))
        );

        return (
          <List.Item
            actions={[
              isFriend ? (
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveFriend(user.id)}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleAddFriend(user.id)}
                >
                  Add Friend
                </Button>
              )
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={user.name}
              description={user.email}
            />
          </List.Item>
        );
      }}
      locale={{ emptyText: 'No users available' }}
    />
  );
};

export default SelectFriendList;
