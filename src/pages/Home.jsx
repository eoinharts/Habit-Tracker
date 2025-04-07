import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React from "react";
import { Button, Segmented, message, Empty } from "antd";
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
import { getUserHabit, deleteHabit, getHabitsWithUserDetails } from "@firebasegen/default-connector";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useAuth();
  const { userData } = useAuth();
  const [userHabits, setUserHabits] = useState([]);
  const navigate = useNavigate();

  const fetchUserHabits = async () => {
    try {
      const data = await getHabitsWithUserDetails({ userId: userData.id });
      setUserHabits(data.data.user.userHabits_on_user);
    } catch (error) {
      message.error("Failed to fetch habits");
    }
  };

  useEffect(() => {
    fetchUserHabits();
  }, []);

  const handleEdit = (habitId) => {
    navigate(`/edit-habit/${habitId}`);
  };

  const handleDelete = async (habitId) => {
    try {
      await deleteHabit({ habitId });
      message.success("Habit deleted successfully");
      fetchUserHabits(); // Refresh the list
    } catch (error) {
      message.error("Failed to delete habit");
    }
  };

  function hasExceededOneDay(timestamp) {
    const now = new Date(); // current time
    const givenTimestamp = new Date(timestamp); // convert the string timestamp to a Date object

    // Calculate the difference in milliseconds
    const timeDifference = now - givenTimestamp;

    // Convert 1 day to milliseconds (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const oneDayInMs = 24 * 60 * 60 * 1000;

    // Check if the difference exceeds 1 day
    return timeDifference > oneDayInMs;
  }

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
        {userHabits.length > 0 ? (
          <>
            {userHabits?.filter((habitDet) => hasExceededOneDay(habitDet.lastTrackedDate)).length > 0 && (
              <>
                <div className="d-flex align-items-center justify-content-between">
                  <Text strong className="d-block mb-1">
                    Habits - To Do
                  </Text>
                  <Button type="link">View All</Button>
                </div>
                {userHabits?.filter((habitDet) => hasExceededOneDay(habitDet.lastTrackedDate)).map((habitDet) => (
                  <HabitsCard
                    key={habitDet.habit.id}
                    habitDet={habitDet}
                    isDone={false}
                    fetchUserHabits={fetchUserHabits}
                    onEdit={() => handleEdit(habitDet.habit.id)}
                    onDelete={() => handleDelete(habitDet.habit.id)}
                  />
                ))}
              </>
            )}
            {/* <HabitsCard title={"Run 10km"} goal="5/10km" emoji="🏃" />
        <HabitsCard title={"Stop Smoking"} goal="10/100 days" emoji="🚬" />
        <HabitsCard title={"Read Daily"} goal="10 days" emoji="📖" /> */}
            {userHabits?.filter((habitDet) => !hasExceededOneDay(habitDet.lastTrackedDate)).length > 0 && (
              <> 
                <div className="d-flex align-items-center justify-content-between">
                  <Text strong className="d-block mb-1">
                    Habits - Done
                  </Text>
                  <Button type="link">View All</Button>
                </div>
                {userHabits?.filter((habitDet) => !hasExceededOneDay(habitDet.lastTrackedDate)).map((habitDet) => (
                  <HabitsCard
                    key={habitDet.habit.id}
                    habitDet={habitDet}
                    isDone={true}
                    fetchUserHabits={fetchUserHabits}
                    onEdit={() => handleEdit(habitDet.habit.id)}
                    onDelete={() => handleDelete(habitDet.habit.id)}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <Empty description="No habits found, please create one" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
