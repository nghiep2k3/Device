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
import { imgurl } from '../../shared/constants/index';
import debounce from 'lodash/debounce';
import styles from '../../assets/styles/index.module.css';
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
            {record.attributes.user.data?.attributes.avatar.data?.attributes
              .url ? (
              <img
                style={{ width: '37px', height: '37px', borderRadius: '999px' }}
                src={`${imgurl}${record.attributes.user.data.attributes.avatar.data.attributes.url}`}
              />
            ) : null}
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
            <EyeOutlined style={{ color: 'blue' }} />
          </Link>

          {role === '3' && (
            <Link to={`/EditDevice/${record.id}`}>
              <EditOutlined style={{ color: 'blue' }} />
            </Link>
          )}

          {role === '1' && <EditOutlined style={{ color: 'blue' }} />}
          {role === '3' && (
            <DeleteOutlined
              style={{ color: 'blue' }}
              onClick={() => deleteDevice(record.id)}
            />
          )}

          {role === '1' && <DeleteOutlined style={{ color: 'blue' }} />}
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
      <div className={styles.form}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 className={styles.tittles}>All Devices</h2>
          </div>
          <div>
            <Link to="/CreateDevice">
              <Button
                className={styles.button}
                style={{ background: '#8767E1' }}
                type="primary"
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
                paddingBottom: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #CBCBCB',
                  width: '493px',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <Select
                    bordered={false}
                    defaultValue="Name"
                    style={{
                      width: 200,
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
                      width: '222px',
                      marginLeft: '20px',
                      border: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginLeft: '50px' }}>
                <div>
                  <Select
                    defaultValue="Status"
                    style={{
                      width: 296,
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
      </div>
      {/* </Layout> */}
    </Layout>
  );
};
export default DeviceManager;
