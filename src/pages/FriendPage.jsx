import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Space,
  Typography,
  Statistic,
  Row,
  Col,
  Avatar,
} from 'antd';
import {
  ArrowLeftOutlined,
  TrophyOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getUserDetails } from '../../dataconnect-generated/js/default-connector/esm/index.esm.js';
import AchievementsBadgeContainer from '../components/AchievementsBadgeContainer/AchievementsBadgeContainer';

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
    <div style={{ padding: '20px' }} className='container'>
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
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              />
            </Col>
            <Col flex="1">
              <Row align="middle" justify="space-between">
                <Col>
                  <Title level={2} style={{ marginBottom: '4px' }}>
                    {friend.name || 'Unnamed User'}
                  </Title>
                  <Text type="secondary">{friend.email}</Text>
                </Col>
                <Col>
                  <Statistic
                    title="Total Points"
                    value={friend.totalPoints || 0}
                    prefix={<StarOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          {/* 🏆 Achievements Section using shared badge component */}
          <div style={{ marginTop: '24px' }}>
            
            <AchievementsBadgeContainer userId={friendId} />
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default FriendPage;
