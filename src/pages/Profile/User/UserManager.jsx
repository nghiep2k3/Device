import {
  UserOutlined,
  DownOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../shared/services/http-client';
import {
  Layout,
  Menu,
  theme,
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
import debounce from 'lodash/debounce';
import styles from '../../../assets/styles/index.module.css';

function Status() {
  const handleMenuClick = e => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const items = [
    {
      label: 'Active',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: 'Blocked',
      key: '2',
      icon: <UserOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div>
      <Dropdown menu={menuProps}>
        <Button>
          <Space style={{ gap: '50px' }}>
            Status
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
}

const UserManager = () => {
  const [searchEmail, setSearchEmail] = useState('username');
  const [searchResults, setSearchResults] = useState('');
  const [Status, setStatus] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')

  const { Search } = Input;
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone_Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      key: 'blocked',
      dataIndex: 'blocked',
      render: (_, { blocked }) => (
        <>
          {blocked ? (
            // Nếu blocked là true, không in ra gì cả
            <Tag color="volcano">Blocked</Tag>
          ) : (
            // Nếu blocked là false, in ra "active"

            <Tag color="geekblue">Active</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/Details/${record.id}`}>
            <EyeOutlined />
          </Link>
          <Link to={`/Edit/${record.id}`}>
            <EditOutlined />
          </Link>
          <DeleteOutlined onClick={() => deleteUser(record.id)} />
        </Space>
      ),
    },
  ];
  const deleteUser = userId => {
    if (window.confirm('Do you want to delete this user?')) {
      axiosInstance
        .delete(`/users/${userId}`)
        .then(res => {
          console.log(res);
          message.success('delete complete');
          axiosInstance.get(`/users`).then(res => {
            setSearchResults(res);
          });
        })
        .catch(err => {
          console.log(err);
          message.error('có lỗi');
        });
    }
  };
  const onSearch = value => {
    axiosInstance
      .get(
        `/users?filters[${searchEmail}][$contains]=${searchKeyword}&filters[blocked][$contains]=${Status}`
      )
      .then(res => {
        setSearchResults(res);
      });
  }, [Status,searchKeyword])

  
  
  

  useEffect(() => {
    axiosInstance.get(`/users`).then(res => {
      setSearchResults(res);
    });
  }, []);

  const handleSearchInputChange = debounce(async event => {
    const { value } = event.target;

    setSearchKeyword(value.trim());
    console.log(4444, searchKeyword);


    axiosInstance
      .get(
        `/users?filters[${searchEmail}][$contains]=${value.trim()}&filters[blocked][$contains]=${Status}`
      )
      .then(res => {
        setSearchResults(res);
      });
  }, 500);

  // const handleSearchStatus = debounce(async () => {
  //     setStatus(!Status);
  //     console.log(Status);

  //     axiosInstance.get(`/users?filters[blocked][$eq]=${Status}`)
  //         .then((res) => {
  //             setSearchResults(res);
  //         })
  // }, 1000);



  return (
    <div>
      <div className={styles.form}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 className={styles.tittle}>All Users</h2>
          </div>

          <div>
            <Button
              className={styles.button}
              style={{ background: '#8767E1' }}
              type="primary"
            >
              <Link to="/Create">Add User</Link>
            </Button>
          </div>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid #CBCBCB',
                width: 'max-content',
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
                    setSearchEmail(e);
                  }}
                  options={[
                    {
                      value: 'email',
                      label: 'Email',
                    },
                    {
                      value: 'username',
                      label: 'Name',
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
                  // enterButton={<button style={{ border: 'none' }}>search</button>}
                  enterButton={
                    <Button
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
                    border: 'none'
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
                      value: '0',
                      label: 'Active',
                    },
                    {
                      value: '1',
                      label: 'Inactive',
                    },
                    {
                      value: '',
                      label: 'All',
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        <Table columns={columns} dataSource={searchResults} />
      </div>
    </div>
  );
};

export default UserManager;
