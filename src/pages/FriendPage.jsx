import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, List, Button, Space, Typography, Badge } from 'antd';
import { ArrowLeftOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
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
          <Title level={2}>{friend.name || 'Unnamed User'}</Title>
          <Text>{friend.email}</Text>
          <Badge count={friend.points || 0} style={{ backgroundColor: '#52c41a' }}>
            <span style={{ padding: '0 8px' }}>Total Points</span>
          </Badge>

          <Title level={4}>
            <TrophyOutlined style={{ marginRight: '8px' }} />
            Achievements
          </Title>
          <List
            dataSource={friend.achievements || []}
            renderItem={achievement => (
              <List.Item>
                <List.Item.Meta
                  avatar={<span style={{ fontSize: '24px' }}>{achievement.icon || '🥉'}</span>}
                  title={achievement.title}
                  description={achievement.tier ? `Tier: ${achievement.tier}` : null}
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
