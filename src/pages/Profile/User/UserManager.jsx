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
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Space, Button, Dropdown, Input, message, Table, Tag,Layout, Menu, theme } from 'antd';


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
    const onSearch = (value) => console.log(value);


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


    )
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
                <Link to="/Details"><EyeOutlined /></Link>
                <Link to="/Edit"><EditOutlined /></Link>
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
const UserManager = () => {
    return(
        <div>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div><h2>All Users</h2></div>
            <div>
                <Button type="primary" >
                    <Link to="/Create">Add User</Link>
                </Button>
            </div>
        </div>
        <Table columns={columns} dataSource={data} />
        </div>)}

export default UserManager;