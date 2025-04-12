import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Segmented } from "antd";
import TextArea from "antd/es/input/TextArea";
import { 
  createHabit, 
  updateHabit, 
  updateHabitStreak, 
  getUserHabit, 
  unlockAchievement 
} from "@firebasegen/default-connector";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router";
import AchievementPopup from "../../components/AchievementPopup/AchievementPopup.jsx"; // Ensure this path is correct

const SubmitButton = ({ form, children, isLoading }) => {
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button
      type="primary"
      htmlType="submit"
      loading={isLoading}
      disabled={!submittable}
      className="w-100 py-4"
    >
      {children}
    </Button>
  );
};

const HabitForm = ({ initialValues, habitId, isEditing }) => {
  const [form] = Form.useForm();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Achievement Popup State
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupBadgeNumber, setPopupBadgeNumber] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  // Mapping thresholds for Good Habit achievements (for testing: 2, 5, 10)
  const GOOD_HABIT_ACHIEVEMENTS = {
    2: "d617ec69b4434be1b73acd7866172dff",  // 2 Good Habits → "1st Good Habit" achievement
    5: "f51ef17a74614193ba6d45d89b67b7b5",  // 5 Good Habits
    10: "4489c9eba9a7489ca5b2e8631d08f054", // 10 Good Habits
  };

  // Mapping thresholds for Bad Habit achievements
  const BAD_HABIT_ACHIEVEMENTS = {
    1: "6808cc372cee4b7e99009615e44103bd", // "1st Bad Habit Logged"
    5: "d51da255e6f94da4a42f333ac97b5d9e", // "5 Bad Habits Logged"
    10: "4bc71f655a3e4eb4bb0c4e88450e6ede", // "10 Bad Habits Logged"
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const onFinish = async ({ name, category, description, streakGoal, emoji }) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateHabit({
          habitId,
          title: name,
          description,
          category,
          streakGoal: Number(streakGoal),
          emoji,
        });
        message.success("Habit updated successfully!");
      } else {
        await createHabitFunction(name, description, category, streakGoal, emoji);
      }
      // After processing habit creation and achievement unlocking, navigate back to Home.
      setTimeout(() => {
        navigate("/");
      }, 1000); //  delay (adjust if necessary)
    } catch (error) {
      message.error(error.message);
    }
    setIsLoading(false);
  };

  const createHabitFunction = async (name, description, category, streakGoal, emoji) => {
    try {
      const res = await createHabit({
        uid: userData.id,
        title: name,
        description,
        category,
        streakGoal: Number(streakGoal),
        emoji,
      });
      console.log("Created habit id:", res.data.habit_insert.id);
      try {
        const bes = await updateHabitStreak({
          habitId: res.data.habit_insert.id,
          currentStreak: 0,
          longestStreak: 0,
          lastTrackedDate: new Date(new Date().getTime() - 25 * 60 * 60 * 1000).toISOString(),
        });
        console.log("Streak updated:", bes);
      } catch (error) {
        message.error(error.message);
      }
      message.success("Habit created successfully!");

      // Achievement unlocking logic:
      // We use a delay to ensure that the new habit is saved and will be returned by getUserHabit.
      setTimeout(async () => {
        try {
          const habitsRes = await getUserHabit({ uid: userData.id });
          const allHabits = habitsRes?.data?.habits || [];
          
          if (category === "Good Habit") {
            const goodHabitsCount = allHabits.filter(h => h.category === "Good Habit").length;
            console.log("Good Habits Count:", goodHabitsCount);
            if (GOOD_HABIT_ACHIEVEMENTS[goodHabitsCount]) {
              const achievementId = GOOD_HABIT_ACHIEVEMENTS[goodHabitsCount];
              await unlockAchievement({ userId: userData.id, achievementId });
              message.success(`Unlocked achievement for ${goodHabitsCount} good habit(s)!`);
              setPopupBadgeNumber(goodHabitsCount);
              setPopupMessage(`You have reached ${goodHabitsCount} Good Habit(s)!`);
              setPopupVisible(true);
            }
          } else if (category === "Bad Habit") {
            const badHabitsCount = allHabits.filter(h => h.category === "Bad Habit").length;
            console.log("Bad Habits Count:", badHabitsCount);
            if (BAD_HABIT_ACHIEVEMENTS[badHabitsCount]) {
              const achievementId = BAD_HABIT_ACHIEVEMENTS[badHabitsCount];
              await unlockAchievement({ userId: userData.id, achievementId });
              message.success(`Unlocked achievement for ${badHabitsCount} bad habit(s)!`);
              setPopupBadgeNumber(badHabitsCount);
              setPopupMessage(`You have logged ${badHabitsCount} Bad Habit(s)!`);
              setPopupVisible(true);
            }
          }
        } catch (err) {
          console.error("Error during achievement check:", err);
          message.error("Failed to check/unlock achievement");
        }
      }, 1000);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        name="habitForm"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input habit name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="category" initialValue="Bad Habit" label="Habit Type">
          <Segmented
            options={["Bad Habit", "Good Habit"]}
            onChange={(e) => form.setFieldValue("category", e)}
            block
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea />
        </Form.Item>
        <Form.Item
          name="streakGoal"
          label="Streak Goal"
          rules={[{ required: true, message: "Please input a habit goal!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="emoji"
          label="Emoji / Placeholder"
          rules={[
            { required: true, message: "Please input an emoji!" },
            { max: 2, message: "Maximum of 2 characters allowed!" },
          ]}
        >
          <Input maxLength={2} />
        </Form.Item>
        <Form.Item>
          <SubmitButton form={form} isLoading={isLoading}>
            {isEditing ? "Update Habit" : "Add Habit"}
          </SubmitButton>
        </Form.Item>
      </Form>

      {/* Achievement Popup */}
      <AchievementPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        badgeNumber={popupBadgeNumber}
        customMessage={popupMessage}
      />
    </>
  );
};

export default HabitForm;
