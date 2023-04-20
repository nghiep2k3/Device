import { UserOutlined,} from '@ant-design/icons';
import React from 'react';
import '../../../assets/styles/index.css';
import { Link } from "react-router-dom";
import { Avatar, Space } from 'antd';
import { Button } from 'antd';
import { axiosInstance } from '../../../shared/services/http-client';
import styles from '../../../assets/styles/index.module.css';
import { useState,useEffect } from 'react';

function ListName(props) {
    return(
        <div>
            <label htmlFor="">{props.title}</label>
            <div style={{ fontWeight: 'bold' }}>{props.name}</div>
        </div>
    );
}


function ListUser() {
    
    const [data, setData] = useState('');
    useEffect(() => {
        axiosInstance.get('/users/me?populate=role')
            .then((res)=>{
                setData(res);   
            })
    }, []);

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
                            <ListName name={data.fullname} title="Name"/>
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
                <Button className={styles.button} type="primary" style={{marginRight: '20px',background: '#8767E1'}}><Link to={`/UserUpdate/${data.id}`}>Update Profile</Link></Button>
                <Button className={styles.button}><Link to="/ChangePassWord">Change PassWord</Link></Button>
            </div>
        </div>
        </div>
    );
}



export default ListUser;