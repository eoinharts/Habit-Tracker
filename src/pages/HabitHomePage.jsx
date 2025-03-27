import React, { useState } from 'react';
import { Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { StopOutlined, CoffeeOutlined, ThunderboltOutlined, ReadOutlined, AppleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';

const { Title } = Typography;

const goodHabits = [
  { name: 'Exercise Regularly', icon: <ThunderboltOutlined style={{ fontSize: '40px' }} /> },
  { name: 'Read More', icon: <ReadOutlined style={{ fontSize: '40px' }} /> },
  { name: 'Eat Healthy', icon: <AppleOutlined style={{ fontSize: '40px' }} /> },
  { name: 'Reduce Caffeine', icon: <CoffeeOutlined style={{ fontSize: '40px' }} /> },
];

const badHabits = [
  { name: 'Stop Smoking', icon: <StopOutlined style={{ fontSize: '40px' }} /> },
  { name: 'Cut Down on Junk Food', icon: <CloseCircleOutlined style={{ fontSize: '40px' }} /> },
  { name: 'Reduce Alcohol', icon: <WarningOutlined style={{ fontSize: '40px' }} /> },
];

const HabitHomePage = () => {
  const [choice, setChoice] = useState(null);
  const navigate = useNavigate();

  const renderHabitCards = (habits) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
      {habits.map((habit, index) => (
        <Card
          key={index}
          hoverable
          style={{
            textAlign: 'center',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
          }}
          bodyStyle={{ padding: '20px' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div>{habit.icon}</div>
          <p style={{ marginTop: '8px', fontWeight: 500 }}>{habit.name}</p>
        </Card>
      ))}
    </div>
  );

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
        <Button onClick={() => navigate('/profile')}>Profile</Button>
        <Button onClick={() => navigate('/')}>Home</Button>
      </div>

      {!choice ? (
        <>
          <Title level={2}>Would you like to...</Title>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '24px' }}>
            <Button type="primary" size="large" onClick={() => setChoice('good')}>
              Build a good habit
            </Button>
            <Button type="primary" danger size="large" onClick={() => setChoice('bad')}>
              Break a bad habit
            </Button>
          </div>
        </>
      ) : (
        <>
          <Title level={3}>
            {choice === 'good' ? 'Popular Good Habits' : 'Common Bad Habits to Break'}
          </Title>
          {choice === 'good' ? renderHabitCards(goodHabits) : renderHabitCards(badHabits)}
          <Button style={{ marginTop: '30px' }} onClick={() => setChoice(null)}>
            Go back
          </Button>
        </>
      )}
    </div>
  );
};

export default HabitHomePage;
