import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    EyeTwoTone,

} from '@ant-design/icons';
import { Layout, Menu, theme, Input, Form, Button,Descriptions } from 'antd';
import React, { useState } from 'react';
import '../../../assets/styles/index.css';



function Change() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
            rules={[{ required: true, message: 'Please input your new password!' }]}
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
                Cancel
            </Button>
            </Form.Item>
        </Form>
    </div>
    </div>
    );
            
        
}



export default Change;