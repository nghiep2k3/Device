import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import {Outlet, Link } from "react-router-dom";
import { Layout, Menu, theme,Avatar,Button,Dropdown  } from 'antd';
import React, { useState, useEffect } from 'react';
import '../../assets/styles/index.css';
import { axiosInstance } from '../../shared/services/http-client';
const { Header, Sider, Content } = Layout;




const Menus = ({ onLogout }) => {
    const [collapsed, setCollapsed] = useState(false);
    const TOKEN = localStorage.getItem('TOKEN');
    
    const [data, setData] = useState('');
    useEffect(() => {
        axiosInstance.get('/users/me?populate=role')
            .then((res)=>{
                setData(res);   
            })
    }, []);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items = [
        {
          key: '1',
          label: (
            
              <Link to="/ListUser">Info</Link>
           
          ),
        },
        {
          key: '2',
          label: (
            <p  onClick={onLogout}>Logout</p>   
          ),
        },
        
      ];
    return (
        <Layout className='SetupHeight'>

            <Sider trigger={null} collapsible collapsed={collapsed} >
                <div className="logo" />
                <h1 style={{
                    margin: '10px 10px',
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
                            label:  <Link to="/UserManager">User</Link>,
                            
                        },
                        {
                            key: '2',
                            icon: <AppstoreOutlined />,
                            
                            label:  <Link to="/DeviceManager">Device</Link>,
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
                        margin: '0 0px',
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
                        
                    }}>
                        
                        
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottom"
                            arrow
                            >
                            <div style={{
                            display: 'inline-flex'
                    }}> 
                            <div><Avatar icon={<UserOutlined />} /></div>
                            <div>
                                <div style={{ fontWeight: 'bold', color: 'black', marginLeft: '10px', marginTop: '4px' }}>
                                    {data.fullname}
                                    
                                </div>
                                <div style={{marginLeft: '10px', marginTop: '22px'}}>
                                    {data.role?.name}
                                    
                                </div>
                            </div>
                        </div>
                        </Dropdown>
                    </div>

                </Header>
                <Content
                    style={{
                        margin: '20px 15px',
                       
                        minHeight: 280,
                    }}
                >
                    <Outlet/>
                </Content>
                
            </Layout>
        </Layout>
    );
};


export default Menus;