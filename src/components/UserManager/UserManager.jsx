import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    AppstoreOutlined,
    DownOutlined,
    AudioOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import Viewprofile from '../Viewprofile/index.jsx';
import { Avatar, Space, Button, Dropdown, Input, message, Table, Tag } from 'antd';


function Status() {
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    const items = [
        {
            label: '1st menu item',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: '2nd menu item',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: '3rd menu item',
            key: '3',
            icon: <UserOutlined />,
            danger: true,
        },
        {
            label: '4rd menu item',
            key: '4',
            icon: <UserOutlined />,
            danger: true,
            disabled: true,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <div>
            <Dropdown menu={menuProps}>
                <Button>
                    <Space style={{ gap: '50px' }}>
                        Status
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    )
}


function SearchName() {
    const { Search } = Input;
    // const onSearch = (value) => console.log(value);


    const items = [
        {
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];

    return (
        <div>
            <div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',

                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '2px solid black',
                        width: 'max-content',
                        borderRadius: '10px'
                    }}>
                        <div><Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Click me
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown></div>

                        <div>
                            <Search
                                placeholder="Search"
                                allowClear
                                bordered={false}
                                onSearch={onSearch}
                                style={{
                                    width: 200,
                                    marginLeft: '20px'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginLeft: '50px' }}>
                        <Status></Status>
                    </div>
                </div>
            </div>
        </div>


    );
}

const columns = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'Email',
        key: 'Email',
    },
    {
        title: 'Phone_Number',
        dataIndex: 'Phone_Number',
        key: 'Phone_Number',
    },
    {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <EyeOutlined />
                <EditOutlined />
                <DeleteOutlined />
            </Space>
        ),
    },
];
const data = [
    {
        index: '1',
        key: '1',
        name: 'John Brown',
        Email: 'nguyennghiep1320@gmail.com',
        Phone_Number: '0378936624',
        tags: ['Active'],
    },
    {
        index: '1',
        key: '2',
        name: 'Jim Green',
        Email: 'nguyennghiep1320@gmail.com',
        Phone_Number: '0378936624',
        tags: ['Active'],
    },
    {
        index: '1',
        key: '3',
        name: 'Joe Black',
        Email: 'nguyennghiep1320@gmail.com',
        Phone_Number: '0378936624',
        tags: ['Active'],
    },
];
const App = () => <Table columns={columns} dataSource={data} />;

const { Header, Sider, Content } = Layout;
const UserManager = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [size, setSize] = useState('large');
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div><h2>All Users</h2></div>
                        <div>
                            <Button type="primary" size={size}>
                                Add user
                            </Button>
                        </div>
                    </div>

                    <SearchName></SearchName>
                    <App></App>

                </Content>
            </Layout>
        </Layout>
    );
};
export default UserManager;