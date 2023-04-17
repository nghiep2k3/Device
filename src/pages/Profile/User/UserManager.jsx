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
import React, { useState, useEffect  } from 'react';
import { Link } from "react-router-dom";
import {Layout, Menu, theme, Avatar, Space, Button, Dropdown, Input, message, Table, Tag,Select,Modal  } from 'antd';
import { axiosInstance } from '../../../shared/services/http-client';
import debounce from "lodash/debounce";


const deleteUser = (userId) => {
    if (window.confirm("Do you want to delete this user?")) {
      axiosInstance
        .delete(`/users/${userId}`)
        .then((res) => {
            console.log(res)
            message.success('delete complete');
          window.location.reload();
        })
        .catch((err) => {
            console.log(err)
            message.error('có lỗi');
        });
    }
  };
  
  
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




const columns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'username',
        key: 'username',
        
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone_Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Status',
        key: 'blocked',
        dataIndex: 'blocked',
        render: (_, { blocked }) => (
            <>
                {blocked ? (
                    // Nếu blocked là true, không in ra gì cả
                    <Tag color='volcano'>Blocked</Tag>
                ) : (
                    // Nếu blocked là false, in ra "active"

                    <Tag color='geekblue'>Active</Tag>
                )}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to="/Details"><EyeOutlined /></Link>
                <Link to={`/Edit/${record.id}`}><EditOutlined /></Link>
                <DeleteOutlined onClick={() => deleteUser(record.id)} />
            </Space>
        ),
    },
];


const UserManager = () => {


    const { Search } = Input;
    const onSearch = (value) => {
        axiosInstance.get(`/users?filters[${searchEmail}][$contains]=${value}`)
        .then((res) => {
            setSearchResults(res);
        })
    };

    const [searchEmail, setSearchEmail] = useState('username');
    const [searchResults, setSearchResults] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axiosInstance.get(`/users`)
        .then((res) => {
            setSearchResults(res);
    })
    }, [])

    const handleSearchInputChange = debounce(async (event) => {
        const { value } = event.target;
        axiosInstance.get(`/users?filters[${searchEmail}][$contains]=${value}`)
        .then((res) => {
            setSearchResults(res);
        })
    }, 3000);

    
    
    const items = [
        {
            label: <a href="https://www.antgroup.com">Email</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">Phone number</a>,
            key: '1',
        }
    ];



    return (
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
                        <div>
                            <Select
                                        defaultValue="Name"
                                        style={{
                                            width: 120,
                                        }}
                                        onChange={(e)=>{
                                            
                                            setSearchEmail(e)
                                        }}
                                        options={[
                                            {
                                                value: 'email',
                                                label: 'Email',
                                            }, {
                                                value: 'username',
                                                label: 'Name',
                                            },
                                        ]}
                            />
                        </div>

                        <div>
                            <Search
                                placeholder="Search"
                                allowClear
                                bordered={false}
                                onSearch={onSearch}
                                onChange={handleSearchInputChange}
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
           
            <Table columns={columns} dataSource={searchResults} />
        </div>
    )
}

export default UserManager;