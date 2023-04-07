import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import './update.css';
import { Avatar, Space } from 'antd';
import { Button } from 'antd';
import {  Form, Input, InputNumber,DatePicker } from 'antd';




function UserUpdate() {
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const onFinish = (values) => {
        console.log(values);
      };
    return (
        <div className='container'>
            <div className='ViewUser1'>
                <div className='SetupUser1'>
                    <div>
                        <Space direction="vertical" size={16}>
                            <Space wrap size={16}>
                                <Avatar size={200} icon={<UserOutlined />} />
                            </Space>
                        </Space>
                    </div>
                    
                </div>

            
            <Form
                    {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                maxWidth: 600,
                }}
                // validateMessages={validateMessages}
                >
            <Form.Item name={['user', 'name']}  label="Name"><Input /></Form.Item>
            
            
            <Form.Item name={['user', 'email']} label="Email" 
            rules={[
                {
                type: 'email',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item name={['user', 'username']} label="Username"><Input />  </Form.Item>

            <Form.Item name={['user', 'address']} label="Address">  <Input /></Form.Item>

            <Form.Item name={['user', 'phoneNumber']} label="PhoneNumber"><Input /> </Form.Item>
            
            <Form.Item name="date-picker" label="DatePicker" ><DatePicker /> </Form.Item>
            
            <Form.Item name={['user', 'Role']} label="Role"><Input /></Form.Item>

            </Form>
        </div>
        

            <div className='ButtonUpdate1'>
                <Button type="primary" style={{ marginRight: '20px' }}>Save</Button>
                <Button><Link to="/ListUser">Cancel</Link></Button>
            </div>

        </div>               
            );
    }


export default Update;