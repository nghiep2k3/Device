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
    console.log(data)
    axiosInstance.post('/auth/local', data)
      .then((response) => {
        const { jwt } = response;
        if (jwt != null) {
          key.push(jwt);
          console.log("complete");
          message.success('Đăng nhập thành công');
          localStorage.setItem('setIsLoggedIn', true)
          setIsLoggedIn(true);
          localStorage.setItem('ACCESS_TOKEN', key);
        } 
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Đăng nhập thất bại');
        message.error('Đăng nhập thất bại');
        
        setIsLoggedIn(false);
        
      });
  };

   const onLogout = () => {
    console.log("log out");
    localStorage.setItem('setLoggedIn', 'false');
    localStorage.removeItem('ACCESS_TOKEN');
    setIsLoggedIn(false);
    
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
            <Menus onLogout={onLogout}/>
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
