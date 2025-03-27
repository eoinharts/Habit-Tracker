import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, List, Button, InputNumber, message, Space, Typography, Tooltip } from 'antd';
import { TrophyOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { getFriendDetails, updateFriendPoints, getFriendAchievements } from '../utils/fireStore';

const { Title, Text } = Typography;

const FriendPage = () => {
    const { friendId } = useParams();
    const navigate = useNavigate();
    const [friend, setFriend] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [pointsToAdd, setPointsToAdd] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFriendData = async () => {
            try {
                const friendData = await getFriendDetails(friendId);
                setFriend(friendData);
                
                const friendAchievements = await getFriendAchievements(friendId);
                setAchievements(friendAchievements);
            } catch (error) {
                console.error('Error loading friend data:', error);
                message.error('Failed to load friend data');
            } finally {
                setLoading(false);
            }
        };

        loadFriendData();
    }, [friendId]);

    const handleAddPoints = async () => {
        try {
            await updateFriendPoints(friendId, pointsToAdd);
            setFriend(prev => ({
                ...prev,
                points: (prev.points || 0) + pointsToAdd
            }));
            message.success(`Added ${pointsToAdd} points to ${friend.name}`);
        } catch (error) {
            console.error('Error adding points:', error);
            message.error('Failed to add points');
        }
    };

    if (loading) {
        return <div>Loading friend details...</div>;
    }

    if (!friend) {
        return <div>Friend not found</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate('/profile')}
                style={{ marginBottom: '20px' }}
            >
                Back to Profile
            </Button>

            <Card>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Title level={2}>{friend.name}</Title>
                    <Text>{friend.email}</Text>
                    <Title level={4}>Points: {friend.points || 0}</Title>

                    <Space>
                        <InputNumber
                            min={1}
                            value={pointsToAdd}
                            onChange={value => setPointsToAdd(value)}
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddPoints}
                        >
                            Add Points
                        </Button>
                    </Space>

                    <Title level={3}>
                        <TrophyOutlined style={{ marginRight: '8px' }} />
                        Achievements
                    </Title>
                    <List
                        dataSource={achievements}
                        renderItem={achievement => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Text style={{ fontSize: '24px' }}>
                                            {achievement.icon || '🥉'}
                                        </Text>
                                    }
                                    title={
                                        <Space>
                                            <Text>{achievement.title}</Text>
                                            <Tooltip title={`${achievement.tier || 'bronze'} tier achievement`}>
                                                <Text type="secondary" style={{ textTransform: 'capitalize' }}>
                                                    ({achievement.tier || 'bronze'})
                                                </Text>
                                            </Tooltip>
                                        </Space>
                                    }
                                />
                            </List.Item>
                        )}
                        locale={{ emptyText: 'No achievements yet' }}
                    />
                </Space>
            </Card>
        </div>
    );
};

export default FriendPage;
