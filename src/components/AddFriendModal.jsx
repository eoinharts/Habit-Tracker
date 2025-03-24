import React from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { addFriend } from '../utils/fireStore';

const AddFriendModal = ({ open, onClose, userId, onSuccess }) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await addFriend(userId, values);
            message.success('Friend added successfully!');
            form.resetFields();
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error adding friend:', error);
            message.error('Failed to add friend');
        }
    };

    return (
        <Modal
            title="Add Friend"
            open={open}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="Add Friend"
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Friend's Name"
                    rules={[{ required: true, message: 'Please enter friend\'s name' }]}
                >
                    <Input placeholder="Enter friend's name" />
                </Form.Item>
                <Form.Item
                    name="points"
                    label="Initial Points"
                    rules={[{ required: true, message: 'Please enter initial points' }]}
                    initialValue={0}
                >
                    <InputNumber
                        min={0}
                        max={999}
                        style={{ width: '100%' }}
                        placeholder="Enter initial points"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddFriendModal;
