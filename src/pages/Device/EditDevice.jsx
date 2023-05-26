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
import { axiosInstance } from '../../shared/services/http-client';
import React, { useState,useEffect } from 'react';
import {Link, useParams,useNavigate} from "react-router-dom";


import { Layout, Menu, theme } from 'antd';
import {
    Input,
    Form,
    Button,
    Col,
    Row,
    Select,
    DatePicker,
    message,
    Checkbox,
    List,
    Table,
    Space,
   
  } from 'antd';
  import styles from '../../assets/styles/index.module.css';

const EditDevice = () => {
  const { Header, Sider, Content } = Layout;
  const userId = useParams();
  const [form] = Form.useForm();
 const [deviceProfile, setDeviceProfile] = useState(null);
 const navigate = useNavigate();

 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/devices/${userId.id}`);
        if (response) {
            setDeviceProfile(response.data.attributes);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [userId]);
  



  useEffect(() => {
    form.setFieldsValue({
      Code: deviceProfile?.code,
      Name: deviceProfile?.name,
      Status:deviceProfile?.status ? "Active" : "Blocked",
      Address: deviceProfile?.address,


    //   Status:deviceProfile?.data.attributes.status,
      
    //   Status:userProfile?.confirmed ? "Blocked" : "Active",
    });
  }, [form, deviceProfile]);
  const onFinish = values => {
    
    const str = values.Status
    const str2 = str.toLowerCase()
    const data = {
        data: {
            name: values.Name,
            status: str2,
            address: values.Address,
        }
      };axiosInstance
      .put(`/devices/${userId.id}`, data)
      .then(response => {
        if (response != null) {
          message.success('correct');
          navigate('/DeviceManager');
        }
      })
      .catch(error => {
        console.log(error);
        message.error('error');
      });
      console.log(data)
   
    
  };
    return (
        <div>
            <div>
                      <h2><span style={{color:'#A9A9A9'}}>All Device</span>  &gt; {deviceProfile?.name}</h2>
                  </div>
          <Content
              style={{
                padding: 10,
                  backgroundColor:'#FFFFFF',
                  borderRadius:15

                 
              }}
          >
             
              <div>
                  <Form
                      name="complex-form"
                      form={form}
                      onFinish={onFinish}
                     
                  >
                      <Row>
                          <Col span={8}>
                              <Form.Item
                                  label="Code"
                                  name="Code"
                                  labelCol={{ span: 24 }}
                                  rules={[
                                      { required: true, message: 'Please input your CODE!' },
                                  ]}
                              >
                                  <Input
                                      className={styles.inputc}
                                     
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
                                      className={styles.inputc}
                                     
                                  />
                              </Form.Item>
                          </Col>

                          <Col span={8}>
                              <Form.Item
                                  label="Status"
                                  name="Status"
                                  labelCol={{ span: 24 }}
                                  rules={[{ required: true, message: 'Select a status!' }]}
                              >
                                  <Select size="large" style={{fontWeight:'bold'}}>
                                      <Select.Option value="active">Active</Select.Option>
                                      <Select.Option value="blocked">Blocked</Select.Option>
                                  </Select>
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row>
                          <Col span={24}>
                              <Form.Item
                                  label="Address"
                                  name="Address"
                                  labelCol={{ span: 24 }}
                                  rules={[{ required: true, message: 'Please input Intro' }]}
                              >
                                  <Input.TextArea  size="large" style={{fontWeight:'bold'}}
                                  
                                      autoSize={{
                                          minRows: 8,
                                          maxRows: 8,
                                      }}
                                    //   showCount
                                    //   maxLength={200}
                                  />
                              </Form.Item>
                          </Col>
                      </Row>

                      <Form.Item >
                      <div style={{borderBottom: '1px solid #DCDCDC',
                                marginBottom: 20}}></div>
                          <Button type="primary" htmlType="submit" style={{ background: '#8767E1' }}>Save</Button>
                          <Button style={{ marginLeft: 8 }}>
                              <Link to="/DeviceManager">Cancel</Link>
                          </Button>
                      </Form.Item>
                  </Form>
              </div>
          </Content>
     </div>
);
};

export default EditDevice;