import React from 'react';
import { Card, Progress, Button } from 'antd';
import Text from "antd/es/typography/Text";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const HabitsCard = ({ title, goal, emoji, className = "", onEdit, onDelete }) => {
  return (
    <Card className={`px-1 mb-1 ${className}`}>
      <div className="d-flex align-items-center justify-content-between py-2">
        <div className="d-flex align-items-center">
          <div className="position-relative">
            <Progress type="circle" percent={80} size={35} showInfo={false} />
            <div className="position-absolute top-50 start-50 translate-middle">
              {emoji}
            </div>
          </div>
          <div className="ms-2">
            <Text className="d-block" style={{ marginBottom: "-5px" }}>
              {title}
            </Text>
            <Text type="secondary">{goal}</Text>
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={onEdit}
            size="small"
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            onClick={onDelete}
            size="small"
            danger
          />
        </div>
      </div>
    </Card>
  );
};

export default HabitsCard;
