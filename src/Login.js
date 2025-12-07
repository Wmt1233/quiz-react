import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    setLoading(true);
     setTimeout(() => {
        // 假装登录成功
        localStorage.setItem('token', 'fake-jwt-token-for-testing');
        message.success('登录成功 (模拟)');
        onLogin(); // 更新 App.js 的状态
        navigate('/admin', { replace: true }); // 跳转到管理页
        setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 300, margin: '100px auto', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Quiz管理系统登录</h2>
      <Form onFinish={handleFinish} autoComplete="off">
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;