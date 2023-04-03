import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    EyeTwoTone,

} from '@ant-design/icons';
import { Layout, Menu, theme, Input, Form, Button,Descriptions } from 'antd';
import React, { useState } from 'react';
import '../../../assets/styles/index.css';
import Change from './ChangePassWord.jsx'
import ListUser from './Profile.jsx'
const { Header, Sider, Content } = Layout;

const Menus = () => {
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
                        
                    }}
                >
                    
                    <Change/>
                </Content>
            </Layout>
        </Layout>
    );
};


export default Menus;