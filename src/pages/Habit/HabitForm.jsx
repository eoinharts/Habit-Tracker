import React from "react";
import { Button, Form, Input, Space } from "antd";
import { Segmented } from "antd";
const SubmitButton = ({ form, children }) => {
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
    <Button type="primary" htmlType="submit" disabled={!submittable} className="w-100 py-4">
      {children}
    </Button>
  );
};

const onFinish = ({name, category, streakGoal}) => {
    
}


const HabitForm = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} onFinish={(e) => console.log(e)} name="validateOnly" layout="vertical" autoComplete="off">
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
      <Form.Item
        name="category"
        initialValue="Bad Habit"
        label="Habit Type"
      >
        <Segmented options={["Bad Habit", "Good Habit"]} onChange={(e) => form.setFieldValue("category", e)} block/>
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
        <Input type="number"/>
      </Form.Item>
      <Form.Item>
          <SubmitButton form={form}>Add Habit</SubmitButton>
      </Form.Item>
    </Form>
  );
};
export default HabitForm;
