import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import './file.css';
import { Descriptions } from 'antd';
import { Avatar, Space } from 'antd';
import { Button } from 'antd';

function ListUser() {
    return (
        <div className='ViewUser'>
            <div className='SetupUser'>
                <div>
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                            <Avatar size={200} icon={<UserOutlined />} />
                        </Space>
                    </Space>
                </div>

                <div className='SetInfo'> 
                    <div className='M100'>
                        <div>
                            <label htmlFor="">Name</label>
                            <div style={{fontWeight: 'bold'}}>Ha Nguyen</div>
                        </div>

                        <div style={{
                            margin: '40px 0'
                        }}>
                            <label htmlFor="">Phone Number</label>
                            <div style={{fontWeight: 'bold'}}>0378936624</div>
                        </div>

                        <div>
                            <label htmlFor="">Address</label>
                            <div style={{fontWeight: 'bold'}}>Duyên Hải - Hưng Hà - Thái Bình</div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="">Email</label>
                            <div style={{fontWeight: 'bold'}}>nguyennghiep1320@gmail.com</div>
                        </div>

                        <div style={{
                            margin: '40px 0'
                        }}>
                            <label htmlFor="">DoB</label>
                            <div style={{fontWeight: 'bold'}}>24/11/2003</div>
                        </div>

                        <div>
                            <label htmlFor="">Role</label>
                            <div style={{fontWeight: 'bold'}}>Admin</div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='ButtonUpdate'>
                <Button type="primary" style={{marginRight: '20px'}}>Update Profile</Button>
                <Button>Change Password</Button>
            </div>
        </div>
    );
}

const { Header, Sider, Content } = Layout;
const Viewprofile = () => {
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
                            icon: <UserOutlined />,
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
                        margin: '0 10px',
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
                            display: 'flex'
                        }}>
                        
                        <div>
                            <Avatar icon={<UserOutlined />} />
                            <span style={{fontWeight: 'bold', color: 'black', marginLeft: '10px'}}>
                                Ha Nguyen
                            </span>
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
                    <ListUser/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Viewprofile;