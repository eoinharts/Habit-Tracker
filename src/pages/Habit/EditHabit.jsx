import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import HeaderContainer from "../../components/HeaderContainer";
import HabitForm from './HabitForm';
import { getHabitById } from '@firebasegen/default-connector';

const EditHabit = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await getHabitById({ habitId });
        setHabit(response.data.habit);
      } catch (error) {
        message.error('Failed to fetch habit details');
        navigate('/');
      }
    };

    fetchHabit();
  }, [habitId]);

  if (!habit) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <HeaderContainer title="Edit Habit" />
      <div className="p-3">
        <HabitForm 
          initialValues={{
            name: habit.title,
            description: habit.description,
            category: habit.category,
            streakGoal: habit.streakGoal
          }}
          habitId={habitId}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default EditHabit; 