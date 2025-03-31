import React from 'react';
import { Card, Progress } from 'antd';
import Text from "antd/es/typography/Text";
import { ClockCircleTwoTone } from '@ant-design/icons';

const HabitsCard = ({ title, goal, emoji, className = "" }) => {
  return (
    <Card className={`px-1 mb-1 ${className}`}>
      <div className="d-flex align-items-center py-2">
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
    </Card>
  );
};

export default HabitsCard;
