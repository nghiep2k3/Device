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
    PlusOutlined,
    MehTwoTone
} from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import React, { useState, useEffect } from 'react';
import { Avatar, Space, Button, Dropdown, Input, message, Table, Tag, Select, Upload } from 'antd';
import { axiosInstance } from '../../shared/services/http-client';
import debounce from "lodash/debounce";



// function SearchName() {
//     const { Search } = Input;
//     const onSearch = (value) => console.log(value);
//     return (
//         <div>
//             <div>
//                 <div style={{
//                     display: 'flex',
//                     alignItems: 'center',

//                 }}>
//                     <div style={{
//                         margin: '10px 0',
//                         display: 'flex',
//                         alignItems: 'center',
//                         border: '2px solid black',
//                         width: 'max-content',
//                         borderRadius: '10px'
//                     }}>
//                         <div>
//                             <Select
//                                 bordered={false}
//                                 defaultValue="Name"
//                                 style={{
//                                     width: 120,
//                                     border: 'none'
//                                 }}
//                                 // onChange={(e) => {
//                                 //     setSearchEmail(e)
//                                 // }}
//                                 options={[
//                                     {
//                                         value: 'code',
//                                         label: 'Code',
//                                     }, {
//                                         value: 'username',
//                                         label: 'Name',
//                                     },{
//                                         value: 'user',
//                                         label: 'User',
//                                     },
//                                 ]}
//                             />
//                         </div>

//                         <div>
//                             <Search
//                                 placeholder="Search"
//                                 allowClear
//                                 bordered={false}
//                                 onSearch={onSearch}
//                                 // onChange={handleSearchInputChange}
//                                 style={{
//                                     width: 200,
//                                     marginLeft: '20px'
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <div style={{ marginLeft: '50px' }}>
//                         <div>
//                             <Select
//                                 defaultValue="Status"
//                                 style={{
//                                     width: 120,
//                                 }}

//                                 // onChange={(e) => {
//                                 //     console.log(e);
//                                 //     setStatus(e)
//                                 // }}
//                                 options={[
//                                     {
//                                         value: 'false',
//                                         label: 'Active',
//                                     }, {
//                                         value: 'true',
//                                         label: 'Inactive',
//                                     },
//                                 ]}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >


//     );
// }

const columns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        render: (_, record) => (
            <Space size="middle">
                {record.attributes.code}
            </Space>
        )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => (
            <Space size="middle">
                {record.attributes.name}
            </Space>
        )
    },
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        render: (_, record) => (
            <Space size="middle">
                <div><img style={{width: "37px", height: "37px", borderRadius: "999px"}} src={`https://edison-device-api.savvycom.xyz${record.attributes.user.data?.attributes.avatar.data?.attributes.url}`}  /></div>
                {record.attributes.user.data?.attributes.username}
                {/* {record.attributes.user.data?.attributes.avatar.data?.attributes.url} */}
            </Space>
        )
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, record) => (
            <Space size="middle" style={{textTransform: 'uppercase'}}>
                {record.attributes.status}
            </Space>
        )
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
// const data = [
//     {
//         index: '1',
//         key: '1',
//         name: 'Camera 01',
//         Email: 'nguyennghiep1320@gmail.com',
//         Phone_Number: '0378936624',
//         tags: ['Active'],
//         code: 'CAM_01'
//     },
//     {
//         index: '1',
//         key: '2',
//         name: 'Camera 01',
//         Email: 'nguyennghiep1320@gmail.com',
//         Phone_Number: '0378936624',
//         tags: ['Active'],
//         code: 'CAM_01'

//     },
//     {
//         index: '1',
//         key: '3',
//         name: 'Camera 01',
//         Email: 'nguyennghiep1320@gmail.com',
//         Phone_Number: '0378936624',
//         tags: ['Active'],
//         code: 'CAM_01'

//     },
// ];

const {Content } = Layout;
const DeviceManager = () => {
    const [searchResults, setSearchResults] = useState('');
    const [Status, setStatus] = useState('false');
    const [searchEmail, setSearchEmail] = useState('name');

    const { Search } = Input;
    
    const [size, setSize] = useState('large');
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    const onSearch = (value) =>{
        axiosInstance.get(`/devices?populate=user.avatar&filters[${searchEmail}][$contains]=${value}&filters[status][$eq]=${Status}`)
            .then((res) => {
                setSearchResults(res.data);
            })
    };
    
    useEffect(() => {
        axiosInstance.get(`/devices?populate=user.avatar`)
            .then((res) => {
                setSearchResults(res.data);
            })
    }, [])

    const handleSearchInputChange = debounce(async (event) => {
        const { value } = event.target;
        axiosInstance.get(`/devices?populate=user.avatar&filters[${searchEmail}][$contains]=${value}&filters[status][$eq]=${Status}`)
            .then((res) => {
                setSearchResults(res.data);
            })
    }, 1000);
    ///devices?populate=user.avatar&filters[code][$contains]=test
    // console.log(searchResults);
    return (
        <Layout className='SetupHeight'>
            {/* <Layout className="site-layout"> */}
            <Content
                style={{
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
                        <Link to="/CreateDevice">
                            <Button type="primary" size={size}>
                                Add user
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* <SearchName></SearchName> */}
                <div>
            <div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',

                }}>
                    <div style={{
                        margin: '10px 0',
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
                                        value: 'code',
                                        label: 'Code',
                                    }, {
                                        value: 'name',
                                        label: 'Name',
                                    },{
                                        value: 'user',
                                        label: 'User',
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
                                        value: 'active',
                                        label: 'Active',
                                    }, {
                                        value: 'inactive',
                                        label: 'Inactive',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
                <Table columns={columns} dataSource={searchResults} />

            </Content>
            {/* </Layout> */}
        </Layout>
    );
};
export default DeviceManager;