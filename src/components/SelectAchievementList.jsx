import React, { useState, useEffect } from 'react';
import { List, Card, Button, message, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const SelectAchievementList = ({ userId, onSuccess, onClose }) => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const allAchievements = await getAllAchievements();
                // Filter out achievements that already belong to the current user
                const availableAchievements = allAchievements.filter(
                    achievement => achievement.userId !== userId
                );
                setAchievements(availableAchievements);
            } catch (error) {
                console.error('Error fetching achievements:', error);
                message.error('Failed to load available achievements');
            } finally {
                setLoading(false);
            }
        };
        fetchAchievements();
    }, [userId]);

    const handleAddAchievement = async (achievement) => {
        try {
            await addAchievement(userId, {
                title: achievement.title,
                icon: achievement.icon
            });
            message.success('Achievement added successfully!');
            onSuccess();
        } catch (error) {
            console.error('Error adding achievement:', error);
            message.error('Failed to add achievement');
        }
    };

    if (loading) {
        return <div>Loading available achievements...</div>;
    }

    return (
        <div>
            <AddAchievementForm userId={userId} onSuccess={onSuccess} />
            
            <Divider>Or choose from existing achievements</Divider>
            
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={achievements}
                renderItem={achievement => (
                    <List.Item>
                        <Card
                            actions={[
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => handleAddAchievement(achievement)}
                                >
                                    Add Achievement
                                </Button>
                            ]}
                        >
                            <Card.Meta
                                avatar={
                                    <div style={{ fontSize: '24px' }}>
                                        {achievement.icon}
                                    </div>
                                }
                                title={achievement.title}
                                description={new Date(achievement.createdAt.toDate()).toLocaleDateString()}
                            />
                        </Card>
                    </List.Item>
                )}
                locale={{ emptyText: 'No available achievements to add' }}
            />
        </div>
    );
};

export default SelectAchievementList;
