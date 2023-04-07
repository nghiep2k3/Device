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
import '../../../assets/styles/index.css';
import { Avatar, Space } from 'antd';
import { Button } from 'antd';
import {  Form, Input, InputNumber,DatePicker } from 'antd';
import { Link } from "react-router-dom";



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
            
            <div className='ViewUser1'>
            <div className='SetupUser1'>
                <div>
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                            <Avatar size={200} icon={<UserOutlined />} />
                        </Space>
                    </Space>
                </div>
            <div className='setup'>
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

            {/* <Form.Item
            wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
            }}
            >
            
            </Form.Item> */}
            <div>
                <Button type="primary" style={{marginRight: '20px'}}>Update Profile</Button>
                <Button><Link to="/ListUser">Cancel</Link></Button>
            </div>
            </Form>
            
            </div>
           
        </div>
        </div>               
            );
    }


export default UserUpdate;