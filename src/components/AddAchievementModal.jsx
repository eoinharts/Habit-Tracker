import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { addAchievement } from '../utils/fireStore';

const ACHIEVEMENT_ICONS = ['🏃', '🏆', '⭐', '🎯', '🎮', '📚', '💪', '🎨', '🎭', '🎼'];

const AddAchievementModal = ({ open, onClose, userId, onSuccess }) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await addAchievement(userId, values);
            message.success('Achievement added successfully!');
            form.resetFields();
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error adding achievement:', error);
            message.error('Failed to add achievement');
        }
    };

    return (
        <Modal
            title="Add Achievement"
            open={open}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="Add Achievement"
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="title"
                    label="Achievement Title"
                    rules={[{ required: true, message: 'Please enter achievement title' }]}
                >
                    <Input placeholder="Enter achievement title" />
                </Form.Item>
                <Form.Item
                    name="icon"
                    label="Achievement Icon"
                    rules={[{ required: true, message: 'Please select an icon' }]}
                >
                    <Select placeholder="Select an icon">
                        {ACHIEVEMENT_ICONS.map((icon) => (
                            <Select.Option key={icon} value={icon}>
                                <span style={{ fontSize: '20px' }}>{icon}</span>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddAchievementModal;
