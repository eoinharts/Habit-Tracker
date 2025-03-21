import React, { useState, useEffect } from 'react';
import { List, Avatar, Button, message } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllUsers, addFriend, getUserFriends } from '../utils/fireStore';
import { useNavigate } from 'react-router-dom';

const SelectFriendList = ({ userId, onSuccess, onClose }) => {
    const [availableUsers, setAvailableUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userFriends, setUserFriends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allUsers, currentUserFriends] = await Promise.all([
                    getAllUsers(),
                    getUserFriends(userId)
                ]);

                // Filter out the current user and already added friends
                const availableUsers = allUsers.filter(user => {
                    const isNotCurrentUser = user.uid !== userId;
                    const isNotAlreadyFriend = !currentUserFriends.some(friend => friend.email === user.email);
                    return isNotCurrentUser && isNotAlreadyFriend;
                });
                
                setAvailableUsers(availableUsers);
                setUserFriends(currentUserFriends);
            } catch (error) {
                console.error('Error fetching users:', error);
                message.error('Failed to load available users');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    const handleAddFriend = async (user) => {
        try {
            await addFriend(userId, {
                name: user.displayName || user.email,
                email: user.email,
                uid: user.uid
            });
            message.success('Friend added successfully!');
            onSuccess();
            // Navigate to friend's page after adding
            navigate(`/friend/${user.uid}`);
        } catch (error) {
            console.error('Error adding friend:', error);
            message.error('Failed to add friend');
        }
    };

    const handleUserClick = (user) => {
        navigate(`/friend/${user.uid}`);
    };

    if (loading) {
        return <div>Loading available users...</div>;
    }

    return (
        <List
            dataSource={availableUsers}
            renderItem={user => (
                <List.Item
                    actions={[
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddFriend(user);
                            }}
                        >
                            Add Friend
                        </Button>
                    ]}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleUserClick(user)}
                >
                    <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={user.displayName || user.email}
                        description={user.email}
                    />
                </List.Item>
            )}
            locale={{ emptyText: 'No available users to add as friends' }}
        />
    );
};

export default SelectFriendList;
