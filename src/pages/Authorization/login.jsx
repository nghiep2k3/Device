import { axiosInstance } from '../../shared/services/http-client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import Menus from '../Profile/menu.jsx'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const key = [];

  const onFinish = (values) => {
    const data = {
      identifier: values.username,
      password: values.password,
    };

    axiosInstance.post('/auth/local', data)
      .then((response) => {
        const { jwt } = response;
        if (jwt != null) {
          key.push(jwt);
          console.log("complete");
          message.success('Đăng nhập thành công');
          setIsLoggedIn(true);
          console.log(key);
          localStorage.setItem('setLoggedIn', 'true');
          localStorage.setItem('TOKEN', key);
        } 
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Lỗi kết nối đến máy chủ');
        message.error('Lỗi kết nối đến máy chủ');
        setIsLoggedIn(true);
        localStorage.setItem('setLoggedIn', 'false');
      });
  };

  const onLogout = () => {
    console.log("log out");
    setIsLoggedIn(false);
    console.log(key);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
            <Button onClick={onLogout}>Logout</Button>
            <Menus/>
        </div>
               
      ) : (
        <div className="container">
          <h3>Login</h3>
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};
export default Login;