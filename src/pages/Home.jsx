import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React from "react";
import { Button, Segmented } from "antd";
import {
  BellTwoTone,
  LogoutOutlined,
} from "@ant-design/icons";
import ChallengesCard from "../components/Cards/ChallengesCard";
import HabitsCard from "../components/Cards/HabitsCard";
import MoodPng from "../assets/Mood-png.png";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import { getUserHabit } from "@firebasegen/default-connector";

const Home = () => {
  const { logout } = useAuth();
  const { userData } = useAuth();
  const [userHabits, setUserHabits] = useState([]);

  const fetchUserHabits = async () => {
    try {
      const data = await getUserHabit({ uid: userData.id });
      setUserHabits(data.data.habits);
    } catch (error) {
      message.error("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchUserHabits();
  }, [])

  return (
    <div>
      <div className="bg-white shadow-btm p-3">
        <div className="d-flex align-items-center justify-content-between">
          <Button
            onClick={() => alert("calendar action")}
            className="rounded-btn"
          >
            <BellTwoTone style={{ fontSize: "18px" }} />
          </Button>
          <Button className="rounded-btn" onClick={logout}>
            <LogoutOutlined style={{ fontSize: "18px" }} />
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="mt-2">
            <Title level={4} style={{ fontWeight: "400" }} className="mb-0">
              Hi Mert 👋
            </Title>
            <Text type="secondary d-block mb-2">
              Let's make habits together
            </Text>
          </div>
          <img
            src={MoodPng}
            alt="emoji"
            className="ms-2"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <Segmented
          className="mt-1"
          style={{ fontWeight: "600" }}
          options={["Today", "Clubs"]}
          block
        />
      </div>
      <div className="px-3 pt-2">
        <div className="d-flex align-items-center justify-content-between">
          <Text strong className="d-block mb-1">
            Challenges
          </Text>
          <Button type="link">View All</Button>
        </div>
        <ChallengesCard timeLeft={"2d 4h 30m"} title="Run 10km " />

        <div className="d-flex align-items-center justify-content-between">
          <Text strong className="d-block mb-1">
            Habits
          </Text>
          <Button type="link">View All</Button>
        </div>
        <HabitsCard title={"Run 10km"} goal="5/10km" emoji="🏃" />
        <HabitsCard title={"Stop Smoking"} goal="10/100 days" emoji="🚬" />
        <HabitsCard title={"Read Daily"} goal="10 days" emoji="📖" />
        {userHabits?.map((habit) => (
          <HabitsCard
            key={habit.id}
            title={habit.title}
            goal={habit.streakGoal}
            emoji="💧"
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
