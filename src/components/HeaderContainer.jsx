import { ArrowLeftOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';

const HeaderContainer = ({onBack, title}) => {
    const navigate = useNavigate();
    return (
      <div className="bg-white shadow-btm p-3">
        <div className="d-flex align-items-center">
          <Button onClick={() => navigate("/")} className="rounded-btn me-3">
            <ArrowLeftOutlined style={{ fontSize: "18px" }} />
          </Button>
          <Typography.Title level={4} className="mb-0">
            {title}
          </Typography.Title>
        </div>
      </div>
    );
}

export default HeaderContainer;
