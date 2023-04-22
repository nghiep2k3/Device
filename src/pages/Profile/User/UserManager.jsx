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
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { axiosInstance } from '../../../shared/services/http-client';
import { Layout, Menu, theme, Avatar, Space, Button, Dropdown, Input, message, Table, Tag, Select, Modal } from 'antd';
import debounce from "lodash/debounce";
import styles from '../../../assets/styles/index.module.css';


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


// function Status() {

//     const [Status, setStatus] = useState('true');
//     const handleSearchStatus = debounce(async (event) => {
//         const { value } = event.target;
//         axiosInstance.get(`/users?filters[blocked][$eq]=${value}`)
//             .then((res) => {
//                 setSearchResults(res);
//             })
//     }, 2000);


//     return (
//         <div>
//             <Select menu={menuProps}
//                 defaultValue="Name"
//                 style={{
//                     width: 120,
//                 }}
//                 onChange={(e) => {

//                     setSearchEmail(e)
//                 }}
//                 options={[
//                     {
//                         value: 'false',
//                         label: 'Active',
//                     }, {
//                         value: 'true',
//                         label: 'Inactive',
//                     },
//                 ]}
//             />
//         </div>
//     )
// }




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
                <Link to={`/Details/${record.id}`}><EyeOutlined /></Link>
                <Link to={`/Edit/${record.id}`}><EditOutlined /></Link>
                <DeleteOutlined onClick={() => deleteUser(record.id)} />
            </Space>
        ),
    },
];


const UserManager = () => {
    const [searchEmail, setSearchEmail] = useState('username');
    const [searchResults, setSearchResults] = useState('');
    const [Status, setStatus] = useState('false');


    const { Search } = Input;
    const onSearch = (value) => {
        axiosInstance.get(`/users?filters[${searchEmail}][$contains]=${value}&filters[blocked][$eq]=${Status}`)
            .then((res) => {
                setSearchResults(res);
            })
    };

    // /users?filters[username][$contains]=nghiep&filters[blocked][$eq]=false

    useEffect(() => {
        axiosInstance.get(`/users`)
            .then((res) => {
                setSearchResults(res);
            })
    }, [])

    const handleSearchInputChange = debounce(async (event) => {
        const { value } = event.target;
        axiosInstance.get(`/users?filters[${searchEmail}][$contains]=${value}&filters[blocked][$eq]=${Status}`)
            .then((res) => {
                setSearchResults(res);
            })
    }, 2000);

    // const handleSearchStatus = debounce(async () => {
    //     setStatus(!Status);
    //     console.log(Status);

    //     axiosInstance.get(`/users?filters[blocked][$eq]=${Status}`)
    //         .then((res) => {
    //             setSearchResults(res);
    //         })
    // }, 1000);


    return (
        <div>
            <div className={styles.form}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div><h2 className={styles.tittle}>All Users</h2></div>

                    <div>
                        <Button className={styles.button} style={{ background: '#8767E1' }} type="primary" >
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
                                    bordered={false}
                                    defaultValue="Name"
                                    style={{
                                        width: 120,
                                        border: 'none'
                                    }}
                                    onChange={(e) => {
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
                            <div>
                                <Select 
                                    defaultValue="Status"
                                    style={{
                                        width: 120,
                                    }}

                                    onChange={(e) => {
                                        console.log(e);
                                        setStatus(e)
                                    }}
                                    options={[
                                        {
                                            value: 'false',
                                            label: 'Active',
                                        }, {
                                            value: 'true',
                                            label: 'Inactive',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Table columns={columns} dataSource={searchResults} />
            </div>
        </div>
    )
}

export default UserManager;