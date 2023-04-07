import { Link } from "react-router-dom";
import { Input, Form, Button, Col, Row,Select ,DatePicker } from 'antd';
import React , {useState} from 'react';
import styles from '../../../assets/styles/index.module.css';
import icon from '../../../assets/images/delete.png'


const Create = () => {
    const [checkedItems, setCheckedItems] = useState([]);
    const [form] = Form.useForm();

    const handleCheckboxChange = (event) => {
    const itemName = event.target.name;
    
    setCheckedItems((prevCheckedItems) => {
      
      if (prevCheckedItems.includes(itemName)) {
        return prevCheckedItems.filter((checkedItem) => checkedItem !== itemName);
      }
      
      else {
        return [...prevCheckedItems, itemName];
      }
    });
  };

  const handleDeleteButtonClick = (itemName) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.filter((checkedItem) => checkedItem !== itemName)
    );
  };

    const onFinish = (values) => {
        const formValues = { ...values, checkedItems };
        console.log('Received values of form: ', formValues);
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
                        name="Username *"
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
                        name="Phone number"
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
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
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
                <DatePicker className={styles.inputc} placeholder="Select a date"/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                        label="Role"
                        name="Role "
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Please input your Role!' }]}
                    >
                    <Select className={styles.inputc} size='large' placeholder="Select owner Role">
                        <Select.Option value="Admin">Admin</Select.Option>
                        <Select.Option value="User">User</Select.Option>
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
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Locker">Locker</Select.Option>
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
                        <ul>
                        <li className={styles.lic}>
                            <label>
                            <input type="checkbox" name="Garage ABC" checked={checkedItems.includes('Garage ABC')} onChange={handleCheckboxChange} />
                            Garage ABC
                            </label>
                        </li>
                        <li className={styles.lic}>
                            <label>
                            <input type="checkbox" name="TLS" checked={checkedItems.includes('TLS')}onChange={handleCheckboxChange}/>
                            TLS
                            </label>
                        </li>
                        <li className={styles.lic}>
                            <label>
                            <input type="checkbox" name="AHC" checked={checkedItems.includes('AHC')} onChange={handleCheckboxChange}/>
                            AHC
                            </label>
                        </li>
                        <li className={styles.lic}>
                            <label>
                            <input type="checkbox" name="CB Garage" checked={checkedItems.includes('CB Garage')} onChange={handleCheckboxChange}/>
                            CB Garage
                            </label>
                        </li>
                        <li className={styles.lic}>
                            <label>
                            <input type="checkbox" name="UCQ" checked={checkedItems.includes('UCQ')} onChange={handleCheckboxChange}/>
                            UCQ
                            </label>
                        </li>
                        </ul>
                    </div>
                    </div>
                    
                
                </Col>
                <Col span={12}>
                
                <div className={styles.right}>
                    <h2> Select devices({checkedItems.length})</h2>
                    <ul>
                    {checkedItems.map((checkedItem) => (
                        <li className={styles.lic} key={checkedItem}>
                        {checkedItem}
                        <button className={styles.deletec} onClick={() => handleDeleteButtonClick(checkedItem)}>
                            <img src={icon} className={styles.iconc} alt="" />
                        </button>
                        </li>
                    ))}
                    </ul>
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