import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Segmented } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  createHabit,
  updateHabit,
  updateHabitStreak,
} from "@firebasegen/default-connector";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router";
import EmojiPicker from 'emoji-picker-react';
import EmojiSelector from "../../components/EmojiSelector";

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

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form, isEditing]);

  const createHabitFunction = async (
    name,
    description,
    category,
    streakGoal,
    emoji
  ) => {
    try {
      const res = await createHabit({
        uid: userData.id,
        title: name,
        description: description || "",
        category,
        streakGoal: Number(streakGoal),
        emoji,
      });

      const newHabitId = res?.data?.habit_insert?.id;
      if (!newHabitId) throw new Error("Failed to get new habit ID.");

      await updateHabitStreak({
        habitId: newHabitId,
        currentStreak: 0,
        longestStreak: 0,
        lastTrackedDate: new Date(Date.now() - 86400000).toISOString(),
      });

      message.success("Habit created successfully!");
      return true;
    } catch (error) {
      console.error("Error creating habit:", error);
      message.error(error.message || "Failed to create habit");
      return false;
    }
  };

  const onFinish = async (values) => {
    const { name, category, description, streakGoal, emoji } = values;
    setIsLoading(true);

    try {
      if (isEditing) {
        await updateHabit({
          habitId,
          title: name,
          description: description || "",
          category,
          streakGoal: Number(streakGoal),
          emoji,
        });
        message.success("Habit updated successfully!");
      } else {
        const success = await createHabitFunction(
          name,
          description,
          category,
          streakGoal,
          emoji
        );
        if (!success) return;
      }

      setTimeout(() => navigate("/"), 300);
    } catch (error) {
      console.error("Form error:", error);
      message.error(error.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      className="row"
      form={form}
      onFinish={onFinish}
      name="habitForm"
      layout="vertical"
      autoComplete="off"
      initialValues={initialValues || { category: "Bad Habit", streakGoal: 7 }}
    >
      <Form.Item
        className="col-12 col-md-6"
        name="name"
        label="Habit Name"
        rules={[{ required: true, message: "Please name your habit!" }]}
      >
        <Input placeholder="e.g., Drink Water" />
      </Form.Item>

      <Form.Item className="col-12 col-md-6" name="category" label="Habit Type">
        <Segmented options={["Bad Habit", "Good Habit"]} block />
      </Form.Item>

      <Form.Item name="description" label="Description (Optional)">
        <TextArea rows={3} placeholder="Add details or motivation (optional)" />
      </Form.Item>

      <Form.Item
        className="col-12 col-md-6"
        name="streakGoal"
        label="Streak Goal (Days)"
        rules={[
          { required: true, message: "Set a goal duration!" },
          {
            type: "number",
            min: 1,
            transform: (v) => Number(v),
            message: "Minimum 1 day",
          },
        ]}
      >
        <Input type="number" min={1} placeholder="e.g., 7, 30" />
      </Form.Item>

      <Form.Item
        className="col-12 col-md-6"
        name="emoji"
        label="Emoji Icon"
        rules={[
          { required: true, message: "Choose an emoji!" },
          { max: 2, message: "Emoji should be 1–2 chars" },
        ]}
      >
        <Input maxLength={2} placeholder="💧, 👍" style={{ width: "80px" }} />
      </Form.Item>

      <Form.Item>
        <SubmitButton form={form} isLoading={isLoading}>
          {isEditing ? "Update Habit" : "Add Habit"}
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default HabitForm;
