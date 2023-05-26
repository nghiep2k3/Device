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
  MehTwoTone,
  SearchOutlined,
} from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import React, { useState, useEffect } from 'react';
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
  Upload,
} from 'antd';
import { axiosInstance } from '../../shared/services/http-client';
import debounce from 'lodash/debounce';

const { Content } = Layout;
const DeviceManager = () => {
  const [searchResults, setSearchResults] = useState('');
  const [Status, setStatus] = useState('');
  const [searchName, setSearchName] = useState('name');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { Search } = Input;
  const role = localStorage.getItem('role');
  const [size, setSize] = useState('large');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const deleteDevice = userId => {
    if (window.confirm('Do you want to delete this device?')) {
      axiosInstance
        .delete(`/devices/${userId}`)
        .then(res => {
          message.success('delete complete');
          axiosInstance.get(`devices?populate=user.avatar`).then(response => {
            setSearchResults(response.data);
          });
        })
        .catch(err => {
          console.log(err);
          message.error('có lỗi');
        });
    }
  };
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
        <Space size="middle">{record.attributes.code}</Space>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space size="middle">{record.attributes.name}</Space>
      ),
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => (
        <Space size="middle">
          <div>
            <img
              style={{ width: '37px', height: '37px', borderRadius: '999px' }}
              src={`https://edison-device-api.savvycom.xyz${record.attributes.user.data?.attributes.avatar.data?.attributes.url}`}
            />
          </div>
          {record.attributes.user.data?.attributes.username}
          {/* {record.attributes.user.data?.attributes.avatar.data?.attributes.url} */}
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, record) => (
        <Space size="middle" style={{ textTransform: 'uppercase' }}>
          {record.attributes.status === 'active' ? (
            <Tag color={'geekblue'} key={'active'}>
              {' '}
              Active{' '}
            </Tag>
          ) : (
            <Tag color={'volcano'} key={'active'}>
              {' '}
              Inactive{' '}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/DetailsDevice/${record.id}`}>
            <EyeOutlined />
          </Link>

          {role === '3' && (
            <Link to={`/EditDevice/${record.id}`}>
              <EditOutlined />
            </Link>
          )}

          {role === '1' && <EditOutlined />}
          {role === '3' && (
            <DeleteOutlined onClick={() => deleteDevice(record.id)} />
          )}

          {role === '1' && <DeleteOutlined />}
        </Space>
      ),
    },
  ];

  const handleSearchInputChange = debounce(async event => {
    const { value } = event.target;
    setSearchKeyword(value.trim());
    console.log(555, searchKeyword);

    axiosInstance
      .get(
        `/devices?populate=user.avatar&filters[${searchName}][$contains]=${value.trim()}`
      )
      .then(res => {
        setSearchResults(res.data);
        setSearchKeyword((value = ''));
      });
  }, 500);

  useEffect(() => {
    console.log('keyword', searchKeyword.trim());
    console.log('searchName', searchName);
    console.log('Status', Status);

    if (Status == '') {
      axiosInstance
        .get(
          `/devices?populate=user.avatar&filters[${searchName}][$contains]=${searchKeyword.trim()}`
        )
        .then(res => {
          setSearchResults(res.data);
        });
    } else if (Status == 'all') {
      axiosInstance
        .get(
          `/devices?populate=user.avatar&filters[${searchName}][$contains]=${searchKeyword.trim()}&filters[status][$eq]=active&filters[status][$eq]=inactive`
        )
        .then(res => {
          setSearchResults(res.data);
        });
    } else {
      axiosInstance
        .get(
          `/devices?populate=user.avatar&filters[${searchName}][$contains]=${searchKeyword.trim()}&filters[status][$eq]=${Status}`
        )
        .then(res => {
          setSearchResults(res.data);
        });
    }
  }, [Status, searchKeyword]);

  useEffect(() => {
    axiosInstance.get(`devices?populate=user.avatar`).then(res => {
      setSearchResults(res.data);
    });
  }, []);

  return (
    <Layout className="SetupHeight">
      {/* <Layout className="site-layout"> */}
      <Content
        style={{
          padding: 24,
          minHeight: 280,
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
            <h2>All Devices</h2>
          </div>
          <div>
            <Link to="/CreateDevice">
              <Button
                type="primary"
                size={size}
                style={{ background: '#8767E1' }}
              >
                Add Device
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  margin: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                  border: '2px solid #CBCBCB',
                  width: '394px',
                  borderRadius: '10px',
                }}
              >
                <div>
                  <Select
                    bordered={false}
                    defaultValue="Name"
                    style={{
                      width: 120,
                      border: 'none',
                    }}
                    onChange={e => {
                      setSearchName(e);
                    }}
                    options={[
                      {
                        value: 'code',
                        label: 'Code',
                      },
                      {
                        value: 'name',
                        label: 'Name',
                      },
                      {
                        value: 'user',
                        label: 'User',
                      },
                    ]}
                  />
                </div>
                <div>|</div>
                <div>
                  <Search
                    placeholder="Search"
                    allowClear
                    bordered={false}
                    onSearch={setSearchKeyword}
                    onChange={handleSearchInputChange}
                    enterButton={
                      <Button
                        // onClick={HanderClick}
                        type="submit"
                        style={{
                          border: 'none',
                          backgroundColor: '#FFFFFF', // Xóa border của button
                        }}
                      >
                        <SearchOutlined />
                      </Button>
                    }
                    style={{
                      width: 200,
                      marginLeft: '20px',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginLeft: '50px' }}>
                <div>
                  <Select
                    defaultValue="Status"
                    style={{
                      width: 180,
                    }}
                    onChange={e => {
                      console.log(e);
                      setStatus(e);
                    }}
                    options={[
                      {
                        value: 'active',
                        label: 'Active',
                      },
                      {
                        value: 'inactive',
                        label: 'Inactive',
                      },
                      {
                        value: 'all',
                        label: 'All',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table columns={columns} dataSource={searchResults} />
      </Content>
      {/* </Layout> */}
    </Layout>
  );
};
export default DeviceManager;
