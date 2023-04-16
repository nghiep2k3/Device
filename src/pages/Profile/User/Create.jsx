import { Link ,useNavigate  } from "react-router-dom";
import { Input, Form, Button, Col, Row,Select ,DatePicker,message,Checkbox,List, Table,Space } from 'antd';
import React , {useState,useEffect } from 'react';
import styles from '../../../assets/styles/index.module.css';
import { axiosInstance } from '../../../shared/services/http-client.js';
const Create = () => {
    const [checkedList, setCheckedList] = useState([]);
    const [dob, setDob] = useState(null);
    const [deviceNames, setDeviceNames] = useState([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleDobChange = (value) => {
        setDob(value);
      }
    const handleDelete = (record) => {
        setCheckedList(checkedList.filter((item) => item.value !== record.value));
      };
     
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axiosInstance.get('/devices');
        if (response.data) {
          setDeviceNames(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDevices();
  }, []);
    const plainOptions = deviceNames.map((device) => ({
        label: device.attributes.code,
        value: device,
    }));
    const valueList = checkedList.map((item) => item.value);
    const onFinish = (values) => {
        const moment = require('moment');
        
        const currentTime = moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const formValues = { ...values, DOB: values.DOB.format('YYYY-MM-DD') };
        console.log(formValues.Role)   
        let isFalse = (formValues.Status === "false"); // kiểm tra chuỗi có giống "false" hay không
        let bool = isFalse ? true : false;
        const data = {
            username: formValues.Username,
            email: formValues.Email,
            fullname: formValues.Name,
            dob: formValues.DOB,
            phoneNumber: formValues.Phone_number,
            gender: formValues.Gender,
            password: formValues.Password,
            role: parseFloat(formValues.Role),
            confirmed: bool,
            createdAt: currentTime,
            devices: valueList
          };
          axiosInstance.post('/users', data)
          .then((response) => {
          if (response != null) {
            
              message.success('correct');
              navigate('/UserManager');
          } 
            })
            .catch((error) => {
                console.log(error);
                message.error('error');
            });
                
            };
    return (
        <div>
            <h2 className={styles.tittle}>All user > Add new user</h2>
        
        <div>
        
            <Form
                name="create_form"
                onFinish={onFinish}
                form={form}
            > 
            <Row>
            <Col span={8}>
                <Form.Item
                    label="Name"
                    name="Name"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                <Input className={styles.inputc} placeholder="Enter owner name" />
            </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                        label="Email"
                        name="Email"
                        labelCol={{ span: 24 }}
                        rules={[    { required: true, message: 'Please input your Email!' },
                                    { type: 'email',message: 'Please enter a valid email address',},]}
                    >
                    <Input className={styles.inputc} placeholder="Enter owner email"/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                        label="Username"
                        name="Username"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Please input your Username !' }]}
                    >
                    <Input className={styles.inputc} placeholder="Enter owner username" />
                </Form.Item>
            </Col>
            </Row>
            <Row>
            <Col span={8}>
                <Form.Item
                    label="Password"
                    name="Password"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                <Input.Password className={styles.inputc} placeholder="Enter owner password" />
            </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                        label="Phone number"
                        name="Phone_number"
                        labelCol={{ span: 24 }}
                        rules={[
                            { required: true, message: 'Please input your Phone number!' },
                            { pattern: /^\d+$/, message: 'Please enter numbers only', },
                            {max: 10,message: 'Please enter no more than 10 digits',},
                        ]}
                    >
                    <Input className={styles.inputc} placeholder="Enter owner phone number"/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                        label="Gender"
                        name="Gender"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Please input your Gender !' }]}
                    >
                    <Select className={styles.inputc} size='large' placeholder="Select owner gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="None">None</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            </Row>
            <Row>
            <Col span={8}>
                <Form.Item
                    label="DOB"
                    name="DOB"
                    labelCol={{ span: 24 }}
                    
                    rules={[{ required: true, message: 'Please input your DOB!' }]}
                >
                <DatePicker 
                    className={styles.inputc} 
                    value={dob}
                    onChange={handleDobChange} 
                    placeholder="Select a date"/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                        label="Role"
                        name="Role"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Please input your Role!' }]}
                    >
                    <Select className={styles.inputc} size='large' placeholder="Select owner Role">
                        <Select.Option value="1">Admin</Select.Option>
                        <Select.Option value="2">User</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                        label="Status"
                        name="Status"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Please input your Status!' }]}
                    >
                    <Select className={styles.inputc} size='large' placeholder="Select owner Role">
                        <Select.Option value="true">Active</Select.Option>
                        <Select.Option value="false">Locker</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            </Row>
            <Row>Device</Row>
            <div className={styles.container}>
            <Row>
                <Col span={12}>
                
                    <div>
                    <div className={styles.left}>
                        <input className={styles.inputc} placeholder="Search for devices ..."/>
                        <List
                            dataSource={plainOptions}
                            renderItem={(item) => (
                                <List.Item>
                                <Checkbox
                                    value={item.value}
                                    checked={checkedList.some((o) => o.value === item.value)}
                                    onChange={(e) => {
                                    if (e.target.checked) {
                                        setCheckedList([...checkedList, item]);
                                    } else {
                                        setCheckedList(checkedList.filter((o) => o.value !== item.value));
                                    }
                                    }}
                                >
                                    {item.label}
                                </Checkbox>
                                </List.Item>
                            )}
                            />
                    </div>
                    </div>
                    
                
                </Col>
                <Col span={12}>
                
                <div className={styles.right}>
                    <h2> Select devices()</h2>
                    <Table
                    dataSource={checkedList}
                    columns={[
                        {
                        dataIndex: 'label',
                        key: 'label',
                        },
                        {
                       
                        key: 'action',
                        render: (text, record) => (
                            <Space size="middle">
                            <a onClick={() => handleDelete(record)}>Delete</a>
                            </Space>
                        ),
                        },
                    ]}
                    />

                </div>
                </Col>
            </Row>
            </div>
            

            <Form.Item >
            <Button type="primary" htmlType="submit" >
                Save
            </Button>
            <Button style={{ marginLeft: 8 }}>
                <Link to="/UserManager">Cancel</Link>
            </Button>
            </Form.Item>
        </Form>
    </div>
    </div>
    );
            
        
}



export default Create;