import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, List, Card, Divider, Typography } from 'antd';
import { TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { addAchievement, getUserAchievements, getFriendDetails } from '../utils/fireStore';

const { Text } = Typography;

const AddAchievementForm = ({ userId, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [achievements, setAchievements] = useState([]);
    const [achievementOwners, setAchievementOwners] = useState({});

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const userAchievements = await getUserAchievements(userId);
                setAchievements(userAchievements);

                // Fetch owner details for each achievement
                const ownerPromises = userAchievements.map(async (achievement) => {
                    const ownerDetails = await getFriendDetails(achievement.userId);
                    return [achievement.userId, ownerDetails];
                });
                
                const owners = Object.fromEntries(await Promise.all(ownerPromises));
                setAchievementOwners(owners);
            } catch (error) {
                console.error('Error fetching achievements:', error);
                message.error('Failed to load achievements');
            }
        };
        fetchAchievements();
    }, [userId]);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            await addAchievement(userId, {
                title: values.title,
                icon: '🏆'
            });
            message.success('Achievement created successfully!');
            form.resetFields();
            onSuccess();
        } catch (error) {
            console.error('Error creating achievement:', error);
            message.error('Failed to create achievement');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                style={{ marginBottom: '24px' }}
            >
                <Form.Item
                    name="title"
                    label="Achievement Title"
                    rules={[{ required: true, message: 'Please enter achievement title' }]}
                >
                    <Input 
                        prefix={<TrophyOutlined />}
                        placeholder="Enter achievement title"
                    />
                </Form.Item>

                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        block
                    >
                        Create Achievement
                    </Button>
                </Form.Item>
            </Form>

            <Divider>Existing Achievements</Divider>

            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={achievements}
                renderItem={achievement => (
                    <List.Item>
                        <Card>
                            <Card.Meta
                                avatar={
                                    <div style={{ fontSize: '24px' }}>
                                        {achievement.icon}
                                    </div>
                                }
                                title={achievement.title}
                                description={
                                    <div>
                                        <div>
                                            <UserOutlined style={{ marginRight: 8 }} />
                                            <Text strong>Owner: </Text>
                                            <Text>{achievementOwners[achievement.userId]?.displayName || 'Loading...'}</Text>
                                        </div>
                                        <div style={{ marginLeft: 24 }}>
                                            <Text type="secondary">{achievementOwners[achievement.userId]?.email || ''}</Text>
                                        </div>
                                        <div style={{ marginTop: 8 }}>
                                            <Text type="secondary">Created: {achievement.createdAt.toDate().toLocaleDateString()}</Text>
                                        </div>
                                    </div>
                                }
                            />
                        </Card>
                    </List.Item>
                )}
                locale={{ emptyText: 'No achievements yet' }}
            />
        </div>
    );
};

export default AddAchievementForm;
