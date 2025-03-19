import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React from "react";
import { Button, Progress, Segmented } from "antd";
import { Card } from "antd";
import {
  ClockCircleTwoTone,
  CalendarTwoTone,
  BellTwoTone,
} from "@ant-design/icons";
import ChallengesCard from "../components/Cards/ChallengesCard";
import HabitsCard from "../components/Cards/HabitsCard";
import MoodPng from "../assets/Mood-png.png";

const Home = () => {
  return (
    <div>
      <div className="bg-white shadow-btm p-3">
        <div className="d-flex align-items-center justify-content-between">
          <Button
            onClick={() => alert("calendar action")}
            className="rounded-btn"
          >
            <CalendarTwoTone style={{ fontSize: "18px" }} />
          </Button>
          <Button className="rounded-btn">
            <BellTwoTone style={{ fontSize: "18px" }} />
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="mt-2">
            <Title level={4} style={{ fontWeight: "400" }} className="mb-0">
              Hi Mert 👋
            </Title>
            <Text type="secondary d-block mb-2">Let's make habits together</Text>
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
        <HabitsCard title={"Drink Water"} goal="500/2000ml" emoji="🏃" />
        <HabitsCard title={"Drink Water"} goal="500/2000ml" emoji="🏃" />
        <HabitsCard title={"Drink Water"} goal="500/2000ml" emoji="🏃" />
      </div>
    </div>
  );
};

export default Home;
