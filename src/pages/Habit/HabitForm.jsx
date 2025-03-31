import React, { useState } from "react";
import { Button, Form, Input, message, Space } from "antd";
import { Segmented } from "antd";
import { createHabit } from "@firebasegen/default-connector";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router";
import TextArea from "antd/es/input/TextArea";
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

const HabitForm = () => {
  const [form] = Form.useForm();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async ({ name, category, description, streakGoal }) => {
    setIsLoading(true);
    try {
      const res = await createHabit({
        uid: userData.id,
        title: name,
        description,
        category: category,
        streakGoal: Number(streakGoal),
      });
      message.success("Habit created successfully!");
      navigate("/");
    } catch (error) {
      message.error(error.message);
    }
    setIsLoading(false);
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
            error: "Please input habit name!",
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
      <Form.Item>
        <SubmitButton form={form} isLoading={isLoading}>
          Add Habit
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};
export default HabitForm;
