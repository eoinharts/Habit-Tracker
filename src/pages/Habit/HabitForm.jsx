import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Space, Popover } from "antd";
import { Segmented } from "antd";
import { createHabit, updateHabit, updateHabitStreak } from "@firebasegen/default-connector";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router";
import TextArea from "antd/es/input/TextArea";
import EmojiSelector from "../../components/EmojiSelector";

const SubmitButton = ({ form, children, isLoading }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
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
          emoji
        });
        message.success("Habit updated successfully!");
      } else {
        await createHabitFunction(name, description, category, streakGoal, emoji);
      }
      navigate("/");
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
        emoji
      });
      try {
        await updateHabitStreak({ 
          habitId: res.data.habit_insert.id, 
          currentStreak: 0, 
          longestStreak: 0, 
          lastTrackedDate: new Date(new Date().getTime() - 25 * 60 * 60 * 1000).toISOString()
        });
      } catch (error) {
        message.error(error.message);
      }
      message.success("Habit created successfully!");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input habit name!",
          },
        ]}
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
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please input habit description!",
          },
        ]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        name="streakGoal"
        label="Streak Goal"
        rules={[
          {
            required: true,
            message: "Please input a habit goal!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="emoji"
        label="Emoji"
        rules={[
          {
            required: true,
            message: "Please select an emoji!",
          },
        ]}
      >
        <Popover
          content={<EmojiSelector value={form.getFieldValue('emoji')} onChange={(emoji) => form.setFieldValue('emoji', emoji)} />}
          title="Select an Emoji"
          trigger="click"
          placement="bottomLeft"
        >
          <Input
            maxLength={2}
            placeholder="Click to select emoji"
            value={form.getFieldValue('emoji')}
            style={{ cursor: 'pointer' }}
            readOnly
          />
        </Popover>
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
