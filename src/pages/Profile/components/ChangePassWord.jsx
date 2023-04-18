import { Link } from "react-router-dom";
import { Input, Form, Button,message } from 'antd';
import React,{ useState }  from 'react';
import '../../../assets/styles/index.css';
import { axiosInstance } from '../../../shared/services/http-client';


function Change() {
    const onFinish = (values) => {
        
        const data = {
            currentPassword: values.current_password,
            password: values.new_password,
            passwordConfirmation: values.confirm_password,
          };
          axiosInstance.post('/auth/change-password', data)
            .then((response) => {
            if (response != null) {
                window.location.reload();
                localStorage.removeItem('ACCESS_TOKEN');
                message.success('correct');
            } 
        })
        .catch((error) => {
            console.log(error);    
            message.error('Current Password Incorrect');
        });
        
      };
    return (
        <div>
            <h2 className='tittle'>Change PassWord</h2>
        
        <div className='change'>
            
            <Form
                name="password_form"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
            <Form.Item
                label="Now you can create a new password for your acconut"
                labelCol={{ span: 24 }}
                style={{
                    paddingTop: 20,
                    
                }}
            ></Form.Item>  
            <Form.Item
                label="Current Password"
                name="current_password"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please input your current password!' }]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            label="New Password"
            name="new_password"
            labelCol={{ span: 24 }}
            rules={[    
                { required: true, message: 'Please input your new password!' },    
                { max: 8, message: 'Password must not exceed 8 characters!' },    
                { pattern: /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^\w\s]).{1,}$/, 
                message: 'Password must contain at least one uppercase letter, one number, and one special character!' }
            ]}
            >
            <Input.Password/>
            </Form.Item>


            <Form.Item
            label="Confirm New Password"
            name="confirm_password"
            labelCol={{ span: 24 }}
            rules={[
                { required: true, message: 'Please confirm your new password!' },
                ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
                }),
            ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item >
            <Button type="primary" htmlType="submit" >
                Save
            </Button>
            <Button style={{ marginLeft: 8 }}>
                <Link to="/ListUser">Cancel</Link>
            </Button>
            </Form.Item>
        </Form>
    </div>
    </div>
    );
            
        
}



export default Change;