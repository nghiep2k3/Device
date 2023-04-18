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
import styles from '../../../assets/styles/index.module.css';
import { Link } from "react-router-dom";
function ListName(props) {
    return(
        <div>
            <label htmlFor="">{props.title}</label>
            <div style={{ fontWeight: 'bold' }}>{props.name}</div>
        </div>
    );
}
function Details() {
    return (
        <div>
        <div>
            <h2 className={styles.tittle}>All user > Minh Quang Tran</h2>
        </div>
        <div>
            
            <div >
                <div style={{
                    display: 'flex',
                }}>
                    <div>
                        <p name="Nguyễn Nghiệp" title="Name" />
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
        </div>
    )
}


export default Details;