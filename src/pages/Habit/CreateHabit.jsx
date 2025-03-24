import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import HabitForm from "./HabitForm";
import { Typography } from "antd";
import HeaderContainer from "../../components/HeaderContainer";

const CreateHabit = () => {
  return (
    <div>
    <HeaderContainer title={"Create Habit"} />
      <div className="p-3">
        <HabitForm />
      </div>
    </div>
  );
};

export default CreateHabit;
