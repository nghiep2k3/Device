import { UserOutlined,} from '@ant-design/icons';
import React from 'react';
import '../../../assets/styles/index.css';
import { Link } from "react-router-dom";
import { Avatar, Space } from 'antd';
import { Button } from 'antd';
import ListName from '../../../components/Viewprofile/ListName/ListName';
import { axiosInstance } from '../../../shared/services/http-client';
import { useState,useEffect } from 'react';


function ListUser() {
    const [data, setData] = useState('');
    const TOKEN = localStorage.getItem('TOKEN');

    axiosInstance.get('/users/me')
    .then((res)=>{
        setData(res);   
    })




    return (
        <div>
            <h2 className='tittle'>My Profile</h2>
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
                            <ListName name={data.username} title="Name"/>
                        </div>

                        <div style={{
                            margin: '40px 0'
                        }}>
                            <ListName name={data.phoneNumber} title="Phone Number"/>
                        </div>

                        <div>
                            <ListName name={data.provider} title="Address"/>
                        </div>
                    </div>

                    <div>
                        <div>
                            <ListName name={data.email} title="Email"/>
                        </div>

                        <div style={{
                            margin: '40px 0'
                        }}>
                            <ListName name={data.dob} title="DoB"/>
                        </div>

                        <div>
                            <ListName name={"Admin"} title="Role"/>
                        </div>
                    </div>

                </div>
            </div>

            <div className='ButtonUpdate'>
                <Button type="primary" style={{marginRight: '20px'}}><Link to="/UserUpdate">Update Profile</Link></Button>
                <Button><Link to="/ChangePassWord">Change PassWord</Link></Button>
            </div>
        </div>
        </div>
    );
}



export default ListUser;