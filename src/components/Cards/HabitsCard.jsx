import React, { useRef, useState, useEffect } from 'react';
import { Card, Progress, Button } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { updateHabitStreak } from "@firebasegen/default-connector";
import Text from 'antd/lib/typography/Text';

const HabitsCard = ({
  emoji,
  className = "",
  onEdit,
  onDelete,
  isDone,
  fetchUserHabits,
  habitDet
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const cardRef = useRef(null);
  const BUTTONS_WIDTH = 100;

  const {currentStreak, longestStreak, lastTrackedDate, habit} = habitDet

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setSwipeOffset(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateHabit = async(accepted) => {
    try{
      const streak = accepted ? currentStreak + 1 : currentStreak;
      const res = await updateHabitStreak({ habitId: habit.id, currentStreak: streak, longestStreak: streak > longestStreak ? streak : longestStreak, lastTrackedDate: new Date().toISOString()});
      fetchUserHabits();
      console.log(res);  
    } catch (error) {
      console.log(error);
    }
  }

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = swipeOffset;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const diff = e.touches[0].clientX - startXRef.current;
    const newOffset = Math.max(0, Math.min(BUTTONS_WIDTH, currentXRef.current - diff));
    setSwipeOffset(newOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (swipeOffset > BUTTONS_WIDTH / 2) {
      setSwipeOffset(BUTTONS_WIDTH);
    } else {
      setSwipeOffset(0);
    }
  };

  const resetSwipe = () => {
    setSwipeOffset(0);
  };

  return (
    <div className="card-container" ref={isDone ? null : cardRef}>
      {/* Action buttons (revealed on swipe) */}
      <div className="action-buttons">
        <button
          className="action-button success"
          onClick={() => {
            updateHabit(true);
            resetSwipe();
          }}
        >
          <CheckOutlined style={{ fontSize: '20px' }} />
        </button>
        <button
          className="action-button danger"
          onClick={() => {
            updateHabit(false);
            resetSwipe();
          }}
        >
          <CloseOutlined style={{ fontSize: '20px' }} />
        </button>
      </div>

      {/* Main card content */}
      <div 
        className="card-wrapper"
        style={{ transform: `translateX(${swipeOffset}px)` }}
      >
        <Card
          className={`${className}`}
          bodyStyle={{ padding: '12px' }}
          onTouchStart={isDone ? null : handleTouchStart}
          onTouchMove={isDone ? null : handleTouchMove}
          onTouchEnd={isDone ? null : handleTouchEnd}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="position-relative">
                <Progress type="circle" percent={(currentStreak/habit.streakGoal) * 100} size={35} showInfo={false} />
                <div className="position-absolute top-50 start-50 translate-middle">
                  {habitDet.habit.emoji}
                </div>
              </div>
              <div className="ms-2">
                <Text className="d-block mb-0">
                  {habit.title}
                </Text>
                <Text type="secondary" className="small">
                  {currentStreak}/{habit.streakGoal} days
                </Text>
              </div>
            </div>
            
            <div className="d-flex gap-2">
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                onClick={onEdit}
                size="small"
              />
              <Button 
                type="text" 
                icon={<DeleteOutlined />} 
                onClick={onDelete}
                size="small"
                danger
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HabitsCard;
