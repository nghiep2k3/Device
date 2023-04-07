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
import './index.css';
import { Descriptions } from 'antd';
import { Avatar, Space } from 'antd';
import { Button } from 'antd';

function ListName(props) {
    return(
        <div>
            <label htmlFor="">{props.title}</label>
            <div style={{ fontWeight: 'bold' }}>{props.name}</div>
        </div>
    );
}

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
                            <ListName name="Nguyễn Nghiệp" title="Name"/>
                        </div>

                        <div style={{
                            margin: '40px 0'
                        }}>
                            <ListName name="0378936624" title="Phone Number"/>
                        </div>

                        <div>
                            <ListName name="Duyên Hải - Hưng Hà - Thái Bình" title="Address"/>
                        </div>
                    </div>

                    <div>
                        <div>
                            <ListName name="nguyennghiep1320@gmail.com" title="Email"/>
                        </div>

                        <div style={{
                            margin: '40px 0'
                        }}>
                            <ListName name="24/11/2003" title="DoB"/>
                        </div>

                        <div>
                            <ListName name="Admin" title="Role"/>
                        </div>
                    </div>

                </div>
            </div>

            <div className='ButtonUpdate'>
                <Button type="primary" style={{ marginRight: '20px' }}>Update Profile</Button>
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
                    <ListUser />
                </Content>
            </Layout>
        </Layout>
    );
};
export default Viewprofile;