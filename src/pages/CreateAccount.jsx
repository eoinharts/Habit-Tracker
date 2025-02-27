import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';

const CreateAccount = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Go to Sign Up / Login</h2>
            <Button onClick={() => navigate("/auth")}>Sign Up / Login</Button>
        </div>
    );
}

export default CreateAccount;
