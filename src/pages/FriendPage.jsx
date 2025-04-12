import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, List, Button, Space, Typography, Badge, Statistic, Row, Col, Avatar } from 'antd';
import { ArrowLeftOutlined, TrophyOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { getUserDetails } from '../../dataconnect-generated/js/default-connector/esm/index.esm.js';

const { Title, Text } = Typography;

const FriendPage = () => {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFriendData = async () => {
      try {
        const res = await getUserDetails({ userId: friendId });
        const friendData = res?.data?.users?.[0];
        setFriend(friendData || null);
      } catch (err) {
        console.error('❌ Error loading friend data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFriendData();
  }, [friendId]);

  if (loading) return <div>Loading friend details...</div>;
  if (!friend) return <div>Friend not found</div>;

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
          <Row gutter={[24, 24]} align="middle">
            <Col>
              <Avatar
                size={120}
                src={friend.photoUrl}
                icon={<UserOutlined />}
                style={{
                  border: '4px solid #f0f0f0',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            </Col>
            <Col flex="1">
              <Row align="middle" justify="space-between">
                <Col>
                  <Title level={2} style={{ marginBottom: '4px' }}>{friend.name || 'Unnamed User'}</Title>
                  <Text type="secondary">{friend.email}</Text>
                </Col>
                <Col>
                  <Statistic
                    title="Total Points"
                    value={friend.points || 0}
                    prefix={<StarOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <div style={{ marginTop: '24px' }}>
            <Title level={4}>
              <TrophyOutlined style={{ marginRight: '8px', color: '#faad14' }} />
              Achievements
            </Title>
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
              dataSource={friend.achievements || []}
              renderItem={achievement => (
                <List.Item>
                  <Card size="small" hoverable>
                    <List.Item.Meta
                      avatar={
                        <div style={{ fontSize: '32px', marginRight: '12px' }}>
                          {achievement.icon || '🏆'}
                        </div>
                      }
                      title={achievement.title}
                      description={
                        <Space direction="vertical" size="small">
                          <Text type="secondary">{achievement.description}</Text>
                          {achievement.tier && (
                            <Badge
                              count={`Tier ${achievement.tier}`}
                              style={{ backgroundColor: '#722ed1' }}
                            />
                          )}
                          {achievement.points && (
                            <Text type="success">+{achievement.points} points</Text>
                          )}
                        </Space>
                      }
                    />
                  </Card>
                </List.Item>
              )}
              locale={{ emptyText: 'No achievements yet' }}
            />
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default FriendPage;
