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
  
  const DetailsDevice = () => {
  const { Header, Sider, Content } = Layout;
  const userId = useParams();
   const [deviceProfile, setDeviceProfile] = useState(null);
   const navigate = useNavigate();
   const deleteDevice = (userId) => {
    
    if (window.confirm("Do you want to delete this device?")) {
      axiosInstance
        .delete(`/devices/${userId}`)
        .then((res) => {
            console.log(res)
            message.success('delete complete');
            navigate('/DeviceManager');
        })
        .catch((err) => {
            console.log(err)
            message.error('có lỗi');
        });
    }
  };
  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axiosInstance.get(`/devices/${userId.id}`);
          if (response) {
              setDeviceProfile(response);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchUsers();
    }, [userId]);
    console.log(deviceProfile)
    return (
     
    <div>
         <div>
         <h2><span style={{color:'#A9A9A9'}}>All Device</span>  &gt; {deviceProfile?.data.attributes.code}</h2>
        </div>
          <Content
              style={{
                  padding: 10,
                  backgroundColor:'#FFFFFF',
                  borderRadius:15
                 
              }}
          >
              {/* <div
                  style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                  }}
              >
                 
              </div>
   */}
              <div>
                  <Form
                      name="complex-form"
                      
                     
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
                          <div>
                              <b >{deviceProfile?.data.attributes.code}</b>
                          </div>
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
                                  <div>
                              <b >{deviceProfile?.data.attributes.name}</b>
                          </div>
                              </Form.Item>
                          </Col>
  
                          <Col span={8}>
                              <Form.Item
                                  label="Status"
                                  name="Status"
                                  labelCol={{ span: 24 }}
                                  rules={[{ required: true, message: 'Select a status!' }]}
                              >
                                 <div>
                              <b >{deviceProfile?.data.attributes.status}</b>
                          </div>
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
                                   <div>
                              <b >{deviceProfile?.data.attributes.address}</b>
                          </div>
                              </Form.Item>
                          </Col>
                      </Row>
                                  
                      <Form.Item >
                    <div style={{borderBottom: '1px solid #DCDCDC',
                                marginBottom: 20}}></div>
                          <Button style={{backgroundColor:'#8767E1',
                                            color:'#FFFFFF',
                                            
                                            }}><Link to={`/EditDevice/${userId.id}`}>Edit</Link></Button>
                          <Button onClick={() => deleteDevice(deviceProfile?.data.id)}  style={{ marginLeft: 8 }}>Delete
                            </Button>
                      </Form.Item>
                  </Form>
              </div>
          </Content>
      
  </div>
  );
  };
  
  export default DetailsDevice;