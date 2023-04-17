import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    AppstoreOutlined,
    RightOutlined,
    CaretRightFilled,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Descriptions } from 'antd';
import { Avatar, Space } from 'antd';
import { Button } from 'antd';
import ListName from '../Viewprofile/ListName/ListName';


function InfoUser() {
    return (
        <div>
            <div style={{border: '1px solid black', borderRadius: '10px', padding: '15px'}}>
                <div style={{
                    display: 'flex',
                }}>
                    <div>
                        <ListName name="Nguyễn Nghiệp" title="Name" />
                        <div style={{margin: '50px 0'}}><ListName name="24/11/2003" title="DoB" /></div>
                        <ListName name="User" title="Role" />
                    </div>

                    <div style={{
                        margin: '0 200px'
                    }}>
                        <ListName name="nguyennghiep1320@gmail.com" title="Email" />
                        <div style={{margin: '50px 0'}}><ListName name="0378936624" title="Phone Number" /></div>
                    </div>

                    <div>
                        <ListName name="nghiep.nguyen" title="User name" />
                        <div style={{margin: '50px 0'}}><ListName name="Male" title="Gender" /></div>
                    </div>
                </div>

                <div style={{
                    marginTop: '20px'
                }}>
                    <span>Devices</span>
                    <div style={{color: '#805EDF', fontSize: '16px', margin: '20px 0' ,fontWeight: '500', padding: '20px 8px', border: '1px solid black', borderRadius: '10px'}}>
                        <p>Device ABC</p>
                        <p>TLS</p>
                        <p>AHC</p>
                        <p>CB Devices</p>
                        <p>UCQ</p>
                    </div>
                </div>

                <div style={{marginTop: '20px', borderTop: '1px solid black', paddingTop: '15px'}}> 
                    <Button type="primary" style={{ marginRight: '20px' }}>Edit</Button>
                    <Button>Delete</Button>
                </div>
            </div>
        </div>
    )
}

const { Header, Sider, Content } = Layout;
const Details = () => {
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
                                <div style={{ marginLeft: '10px', marginTop: '22px' }}>Admin</div>
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
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    ><h2>All Device <CaretRightFilled /> Thien Nghiep Nguyen</h2></div>
                    <InfoUser />

                </Content>
            </Layout>
        </Layout>
    );
};
export default Details;