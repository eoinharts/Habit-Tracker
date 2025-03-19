import React from 'react';
import { Card, Progress } from 'antd';
import Text from "antd/es/typography/Text";
import { ClockCircleTwoTone } from '@ant-design/icons';

const ChallengesCard = ({title, timeLeft, className = ""}) => {
    return (
      <Card className={`px-1 mb-1 ${className}`}>
        <div
          className="d-flex align-items-center"
          style={{ marginBottom: "-7px" }}
        >
          <span>
            <ClockCircleTwoTone style={{ fontSize: "18px" }} className='ms-1'/>
          </span>
          <div className="ms-2">
            <Text className="d-block" style={{ marginBottom: "-5px" }}>
              {title}
            </Text>
            <Text type="secondary">{timeLeft}</Text>
          </div>
        </div>
        <Progress percent={50} showInfo={false} size={["default", 4]} />
      </Card>
    );
}

export default ChallengesCard;
