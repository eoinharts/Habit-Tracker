import React from 'react';
import HabitsCard from '../components/Cards/HabitsCard';
import ChallengesCard from '../components/Cards/ChallengesCard';

const Components = () => {
    return (
        <div className='p-3'>
            <h6>Challenges Card</h6>
            <ChallengesCard title="Challenges Card" timeLeft="1h 30m" />
            <h6>Habits Card</h6>
            <HabitsCard title="Habits Card" goal="1h 30m" emoji={"🍎"} />
        </div>
    );
}

export default Components;
