import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import styles from '../../../assets/styles/index.module.css';
import React, { useState,useEffect } from 'react';
import '../../../assets/styles/index.css';
import { Avatar, Space, Layout, Menu, theme,Form, Input, Divider,DatePicker ,Col,Row,message} from 'antd';
import { Button } from 'antd';

import { Link ,useParams,useNavigate} from "react-router-dom";
import { axiosInstance } from '../../../shared/services/http-client';
import moment from "moment";

function UserUpdate() {
    const [userProfile, setUserProfile] = useState(null);
    const [dob, setDob] = useState(null);
    const navigate = useNavigate();
    const userId = useParams();
    const [form] = Form.useForm();
    const handleDobChange = value => {
        setDob(value);
      };
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axiosInstance.get(`/users/${userId.id}?populate=role`);
            if (response) {
              setUserProfile(response);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchUsers();
      }, [userId]);
      useEffect(() => {
        form.setFieldsValue({
          Name: userProfile?.fullname,
          Username:userProfile?.username,
          Email: userProfile?.email,
          Phone_number:userProfile?.phoneNumber,
          DOB:moment(userProfile?.dob),
          Role: userProfile?.role.name,
        });
      }, [form, userProfile]);
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const onFinish = (values) => {
        const formValues = { ...values, DOB: values.DOB.format('YYYY-MM-DD') };
        const data = {
            fullname: formValues.Name,
            dob: formValues.DOB,
            phoneNumber: formValues.Phone_number,
          };
          axiosInstance
          .put(`/users/${userId.id}`, data)
          .then(response => {
            if (response != null) {
              message.success('correct');
              navigate('/ListUser');
              window.location.reload();
            }
          })
          .catch(error => {
            console.log(error);
            message.error('error');
          });
      };
    return (
            
            <div className='ViewUser1'>
            <div className='SetupUser1'>
                <div>
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                            <Avatar size={200} icon={<UserOutlined />} />
                        </Space>
                    </Space>
                </div>
            <div className='setup'>
            <Form
                name="nest_messages"
                onFinish={onFinish}
                style={{
                maxWidth: 600,
                }}
                form={form}
                >
            <Row>
                <Col span={24}>
                <Form.Item
                    label="Name"
                    name="Name"
                    labelCol={{ span: 24 }}
                >
                    <Input 
                    className={styles.inputp}
                    defaultValue={userProfile?.fullname}/>
                </Form.Item>
                </Col>
            </Row>
           
            <Row>
                <Col span={24}>
                <Form.Item
                    label="Email"
                    name="Email"
                    labelCol={{ span: 24 }}
                >
                    <Input 
                    className={styles.inputp}
                    disabled
                    defaultValue={userProfile?.email}/>
                </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <Form.Item
                    label="Username"
                    name="Username"
                    labelCol={{ span: 24 }}
                >
                    <Input 
                    className={styles.inputp}
                    disabled
                    defaultValue={userProfile?.username}/>
                </Form.Item>
                </Col>
            </Row>
            <Row>
            <Col span={8}>
                <Form.Item
                    label="DOB"
                    name="DOB"
                    labelCol={{ span: 24 }}>
                    <DatePicker
                    className={styles.inputc}
                    value={dob}
                    onChange={handleDobChange}
                    placeholder="Select a date"
                />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                    label="Phone_number"
                    name="Phone_number"
                    labelCol={{ span: 24 }}
                >
                    <Input 
                    className={styles.inputp}
                    defaultValue={userProfile?.Phone_number}/>
                </Form.Item>
                </Col>
            </Row>
            
            <Row>
                <Col span={24}>
                <Form.Item
                    label="Role"
                    name="Role"
                    labelCol={{ span: 24 }}
                >
                    <Input 
                    className={styles.inputp}
                    disabled
                    defaultValue={userProfile?.role.name}/>
                </Form.Item>
                </Col>
            </Row>

            
            <div>
            <Divider style={{ background: 'gray' }}/>
            <Form.Item>
                <Button className={styles.button} type="primary" style={{marginRight: '20px',background: '#8767E1' }}  htmlType="submit">Update Profile</Button>
                <Button className={styles.button}><Link to="/ListUser">Cancel</Link></Button>
            
            </Form.Item>
            </div>
            </Form>
            
            </div>
           
        </div>
        </div>               
            );
    }


export default UserUpdate;