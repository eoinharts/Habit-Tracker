import React, { useState, useEffect } from 'react';
import { Layout, Typography, Tabs, Avatar, List, Card, Badge, Button, message, Popconfirm, Modal, Space, Tooltip } from 'antd';
import { auth } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { TrophyOutlined, UserOutlined, ArrowLeftOutlined, DeleteOutlined, UpOutlined, EyeOutlined } from '@ant-design/icons';
import { getUserFriends, getUserAchievements, removeFriend, removeAchievement, upgradeAchievement, getUserPoints } from '../utils/fireStore';
import SelectFriendList from '../components/SelectFriendList';
import SelectAchievementList from '../components/SelectAchievementList';

const { Title, Text } = Typography;

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [userPoints, setUserPoints] = useState(0);
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [showAchievementsModal, setShowAchievementsModal] = useState(false);
    const navigate = useNavigate();

    const fetchUserData = async (userId) => {
        try {
            const [userFriends, userAchievements, points] = await Promise.all([
                getUserFriends(userId),
                getUserAchievements(userId),
                getUserPoints(userId)
            ]);
            setFriends(userFriends);
            setAchievements(userAchievements);
            setUserPoints(points);
        } catch (error) {
            console.error("Error fetching data:", error);
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
            await removeFriend(friendId);
            message.success('Friend removed successfully');
            fetchUserData(user.uid);
        } catch (error) {
            console.error('Error removing friend:', error);
            message.error('Failed to remove friend');
        }
    };

    const handleRemoveAchievement = async (achievementId) => {
        try {
            await removeAchievement(achievementId);
            message.success('Achievement removed successfully');
            fetchUserData(user.uid);
        } catch (error) {
            console.error('Error removing achievement:', error);
            message.error('Failed to remove achievement');
        }
    };

    const handleUpgradeAchievement = async (achievementId, currentTier) => {
        try {
            // Can only upgrade from bronze to silver, or silver to gold
            const targetTier = currentTier === 'bronze' ? 'silver' : 'gold';
            const cost = currentTier === 'bronze' ? 50 : 100;

            if (userPoints < cost) {
                message.error(`Not enough points! You need ${cost} points to upgrade to ${targetTier}`);
                return;
            }

            await upgradeAchievement(user.uid, achievementId, targetTier);
            message.success(`Achievement upgraded to ${targetTier}!`);
            fetchUserData(user.uid);
        } catch (error) {
            console.error('Error upgrading achievement:', error);
            if (error.message.includes('Invalid upgrade path')) {
                message.error('You must upgrade from bronze to silver first, then from silver to gold');
            } else {
                message.error('Failed to upgrade achievement');
            }
        }
    };

    const getUpgradeButton = (achievement) => {
        if (achievement.tier === 'gold') return null;

        const nextTier = achievement.tier === 'bronze' ? 'silver' : 'gold';
        const cost = achievement.tier === 'bronze' ? 50 : 100;
        const canUpgrade = userPoints >= cost;

        return (
            <Tooltip title={canUpgrade ? 
                `Upgrade to ${nextTier} (${cost} points)` : 
                `Need ${cost} points to upgrade to ${nextTier}`}
            >
                <Button
                    type="default"
                    icon={<UpOutlined />}
                    onClick={() => handleUpgradeAchievement(achievement.id, achievement.tier || 'bronze')}
                    disabled={!canUpgrade}
                    size="small"
                >
                    Upgrade to {nextTier}
                </Button>
            </Tooltip>
        );
    };

    const items = [
        {
            key: '1',
            label: 'Friends',
            children: (
                <>
                    <Button
                        type="primary"
                        style={{ marginBottom: 16 }}
                        onClick={() => setShowFriendsModal(true)}
                    >
                        Add Friends
                    </Button>
                    <List
                        dataSource={friends}
                        renderItem={friend => (
                            <List.Item 
                                style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}
                                actions={[
                                    <Space>
                                        <Text>Points: {friend.points}</Text>
                                        <Button
                                            type="link"
                                            size="small"
                                            icon={<EyeOutlined />}
                                            onClick={() => navigate(`/friend/${friend.uid}`)}
                                            style={{ padding: '0 4px', minWidth: 'auto' }}
                                        >
                                            View
                                        </Button>
                                    </Space>,
                                    <Popconfirm
                                        title="Remove Friend"
                                        description="Are you sure you want to remove this friend?"
                                        onConfirm={() => handleRemoveFriend(friend.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button 
                                            type="text" 
                                            danger 
                                            icon={<DeleteOutlined />}
                                        />
                                    </Popconfirm>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar icon={<UserOutlined />} />}
                                    title={friend.name}
                                    description={friend.email}
                                />
                            </List.Item>
                        )}
                        locale={{ emptyText: 'No friends added yet' }}
                    />
                </>
            )
        },
        {
            key: '2',
            label: 'Achievements',
            children: (
                <>
                    <Button
                        type="primary"
                        style={{ marginBottom: 16 }}
                        onClick={() => setShowAchievementsModal(true)}
                    >
                        Add Achievements
                    </Button>
                    <List
                        dataSource={achievements}
                        renderItem={achievement => (
                            <Card 
                                style={{ 
                                    marginBottom: '12px',
                                    borderRadius: '8px',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                }}
                                actions={[
                                    getUpgradeButton(achievement),
                                    <Popconfirm
                                        title="Remove Achievement"
                                        description="Are you sure you want to remove this achievement?"
                                        onConfirm={() => handleRemoveAchievement(achievement.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined style={{ color: '#ff4d4f' }} />
                                    </Popconfirm>
                                ].filter(Boolean)}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <div style={{ 
                                            fontSize: '24px',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {achievement.icon}
                                        </div>
                                    }
                                    title={achievement.title}
                                    description={new Date(achievement.createdAt.toDate()).toLocaleDateString()}
                                />
                            </Card>
                        )}
                        locale={{ emptyText: 'No achievements yet' }}
                    />
                </>
            )
        }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout style={{ 
            minHeight: '100vh',
            background: '#FAFAFA',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px'
                }}>
                    <Title level={4} style={{ margin: 0 }}>Your Profile</Title>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        Back to Home
                    </Button>
                </div>

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
                    <Avatar 
                        size={80}
                        src={user?.photoURL}
                        icon={!user?.photoURL && <UserOutlined />}
                        style={{ marginBottom: '12px' }}
                    />
                    <Title level={4} style={{ margin: 0 }}>
                        {user?.displayName || user?.email}
                    </Title>
                    <Typography.Text type="secondary">
                        {user?.email}
                    </Typography.Text>
                    <Badge count={userPoints} 
                           overflowCount={999} 
                           style={{ backgroundColor: '#3B82F6', marginTop: '8px' }}>
                        <Typography.Text style={{ marginLeft: '8px' }}>
                            Total Points
                        </Typography.Text>
                    </Badge>
                </div>

                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    style={{
                        background: '#fff',
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                />
            </div>

            <Modal
                title="Add Friends"
                open={showFriendsModal}
                onCancel={() => setShowFriendsModal(false)}
                footer={null}
                width={600}
            >
                <SelectFriendList
                    userId={user?.uid}
                    onSuccess={() => {
                        fetchUserData(user?.uid);
                        setShowFriendsModal(false);
                    }}
                    onClose={() => setShowFriendsModal(false)}
                />
            </Modal>

            <Modal
                title="Add Achievements"
                open={showAchievementsModal}
                onCancel={() => setShowAchievementsModal(false)}
                footer={null}
                width={600}
            >
                <SelectAchievementList
                    userId={user?.uid}
                    onSuccess={() => {
                        fetchUserData(user?.uid);
                        setShowAchievementsModal(false);
                    }}
                    onClose={() => setShowAchievementsModal(false)}
                />
            </Modal>
        </Layout>
    );
};

export default ProfilePage;
