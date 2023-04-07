import { UserOutlined,} from '@ant-design/icons';
import React from 'react';
import '../../../assets/styles/index.css';
import { Link } from "react-router-dom";
import { Avatar, Space } from 'antd';
import { Button } from 'antd';

function ListUser() {
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
                            <label htmlFor="">Name</label>
                            <div style={{fontWeight: 'bold'}}>Ha Nguyen</div>
                        </div>

                        <div style={{
                            margin: '40px 0'
                        }}>
                            <label htmlFor="">Phone Number</label>
                            <div style={{fontWeight: 'bold'}}>0378936624</div>
                        </div>

                        <div>
                            <label htmlFor="">Address</label>
                            <div style={{fontWeight: 'bold'}}>Duyên Hải - Hưng Hà - Thái Bình</div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="">Email</label>
                            <div style={{fontWeight: 'bold'}}>nguyennghiep1320@gmail.com</div>
                        </div>

                        <div style={{
                            margin: '40px 0'
                        }}>
                            <label htmlFor="">DoB</label>
                            <div style={{fontWeight: 'bold'}}>24/11/2003</div>
                        </div>

                        <div>
                            <label htmlFor="">Role</label>
                            <div style={{fontWeight: 'bold'}}>Admin</div>
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