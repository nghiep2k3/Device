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
import { Descriptions } from 'antd';
import { Avatar, Space } from 'antd';
import { Button } from 'antd';
import {  Form, Input, InputNumber,DatePicker } from 'antd';


// function ListName1(props) {
//     return(
//         <div>
//             <label htmlFor="">{props.title}</label>
//             <div style={{ fontWeight: 'bold' }}>{props.name}</div>
//         </div>
//     );
// }

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

            {/* <Form.Item
            wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
            }}
            >
            
            </Form.Item> */}
            </Form>
        </div>
        

            <div className='ButtonUpdate1'>
                <Button type="primary" style={{ marginRight: '20px' }}>Save</Button>
                <Button>Cancel</Button>
            </div>

        </div>
                
            );
        }

const { Header, Sider, Content } = Layout;
const Update = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className='SetupHeight'>

            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <h1 style={{
                    margin: '20px 20px',
                    color: 'white',
                }}>Menu</h1>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'User',
                            // children:[
                            //     {label: ''}
                            // ]
                        },
                        {
                            key: '2',
                            icon: <AppstoreOutlined />,
                            
                            label: 'Device',
                        },

                    ]}
                />
            </Sider>

            <Layout className="site-layout">
                <Header
                    style={{
                        padding: '0',
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 10px',
                        lineHeight: '0px',
                        justifyContent: 'space-between',
                        background: colorBgContainer,
                    }}
                >
                    <div>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </div>

                    <div style={{
                        // display: 'flex'
                    }}>

                        <div style={{
                            display: 'inline-flex'
                    }}> 
                            <div><Avatar icon={<UserOutlined />} /></div>
                            <div>
                                <div style={{ fontWeight: 'bold', color: 'black', marginLeft: '10px', marginTop: '4px' }}>
                                    Ha Nguyen
                                </div>
                                <div style={{marginLeft: '10px', marginTop: '22px'}}>Admin</div>
                            </div>
                        </div>

                    </div>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <h2>My Profile</h2>
                   <UserUpdate></UserUpdate>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Update;