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
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
    Avatar,
    Space,
    Button,
    Dropdown,
    Input,
    message,
    Table,
    Tag,
    Select,
    Modal,
} from 'antd';
import {
    Form,
    Col,
    Row,
    DatePicker,
    Checkbox,
    List,
    Divider,
    Option,
    TextArea,
} from 'antd';

import styles from '../../assets/styles/index.module.css';
import { axiosInstance } from '../../shared/services/http-client';

const CreateDevice = () => {
    const { Header, Sider, Content } = Layout;
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [size, setSize] = useState('large');
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onFinish = values => {
        const moment = require('moment');
        const currentTime = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        // console.log('Received values of form: ', values);
        const formValues = { ...values };
        console.log(formValues)

        // const Username = {data: us}

        const data = {
            data:{
                name: formValues.Name,
            code: formValues.Code,
            status: formValues.Gender,
            address: formValues.intro,
            // user: {
            //     data: {
            //         attributes: {
            //             username: "Nghiep"
            //         }
            //     }
            // }
            }
        };

        // const datas = { data: data };

        console.log(1111, data);

        axiosInstance.post('/devices', data)
            .then((response) => {
                if (response != null) {
                    message.success('correct');
                    navigate('/DeviceManager');
                }
            })
            .catch((error) => {
                console.log(error);
                message.error('error');
            });




    };

    const onChange = e => {
        console.log('Change:', e.target.value);
    };
    return (
        <Layout className="SetupHeight">
            <Layout className="site-layout">
                <Content
                    style={{
                        padding: 24,
                        background: colorBgContainer,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <h2>All Device &gt; Add a new service</h2>
                        </div>
                    </div>

                    <div>
                        <Form
                            name="complex-form"
                            onFinish={onFinish}
                            form={form}
                        >
                            <Row>
                                <Col span={8}>
                                    <Form.Item
                                        label="Code"
                                        name="Code"
                                        labelCol={{ span: 24 }}
                                        rules={[
                                            { required: true, message: 'Please input your name!' },
                                        ]}
                                    >
                                        <Input
                                            style={{
                                                width: 300,
                                            }}
                                            placeholder="Enter device code"
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item
                                        label="Name"
                                        name="Name"
                                        labelCol={{ span: 24 }}
                                        rules={[
                                            { required: true, message: 'Please input your name!' },
                                        ]}
                                    >
                                        <Input
                                            style={{
                                                width: 300,
                                            }}
                                            placeholder="Enter device name"
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item
                                        label="Gender"
                                        name="Gender"
                                        labelCol={{ span: 24 }}
                                        rules={[{ required: true, message: 'Select a status!' }]}
                                    >
                                        <Select
                                            className={styles.inputc}
                                            placeholder="Select owner gender"
                                        >
                                            <Select.Option value="active">active</Select.Option>
                                            <Select.Option value="inactive">InActive</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="Intro"
                                        name="intro"
                                        labelCol={{ span: 24 }}
                                        rules={[{ required: true, message: 'Please input Intro' }]}
                                    >
                                        <Input.TextArea
                                            autoSize={{
                                                minRows: 8,
                                                maxRows: 8,
                                            }}
                                            showCount
                                            maxLength={200}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item >
                                <Button type="primary" className={styles.button} htmlType="submit" style={{ marginRight: '20px', background: '#8767E1' }}>Save</Button>
                                <Button className={styles.button} style={{ marginLeft: 8 }}>
                                    <Link to="/DeviceManager">Cancel</Link>
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default CreateDevice;
