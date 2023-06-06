import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Select} from "antd";
import {createUser, getUsers} from "../api/config/user";
import {createMessage, getUserMessages} from "../api/config/message";
import {useNavigate} from "react-router-dom";
function Messages(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [loading, setLoading] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate()
    const onFinish = (values) => {
        setLoading(true)
        createMessage({
            ...values,
            authorId: user.id
        }).then((res)=>{
            console.log(res)
            message.success("Message sent")
            setLoading(false)
        })
            .catch(err=>{
                message.error("Something went wrong")
                console.log(err)
                setLoading(false)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const fetchMessages = async () => {
        try {
            const response = await getUserMessages(user.id);
            console.log(response)
            setMessages(response.data.messages);
        }
        catch (error) {
            console.error('Error retrieving messages:', error);
            message.error("Something went wrong")
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setAllUsers(response.data.map(item=>({
                label: item.name,
                value: item.id
            })))
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            message.error("Something went wrong")
        }
    }




    useEffect(() => {
        fetchMessages();
        fetchUsers()
        // Fetch data every 5 seconds
        const interval = setInterval(()=>{
            fetchMessages();
            fetchUsers()
        }, 4000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="d-flex align-items-center w-100 h-100 flex-column justify-content-center">
                            <div className="d-flex w-100 justify-content-between mb-4">
                                <h3>Hello <span style={{color:"#00A000"}}>{user.name}</span></h3>
                                <Button onClick={()=>{localStorage.removeItem("user"); navigate("/login")}} type="primary" danger>Logout</Button>
                            </div>
                            <Form
                                name="basic"
                                layout="vertical"
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                style={{
                                    width:'100%'
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="To"
                                    name={"recipientId"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input receiver name!',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={allUsers}
                                    >
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    placeholder={"Your name"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Title!',
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    label="Text"
                                    name="text"
                                    placeholder={"Your name"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Message!',
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    // wrapperCol={{
                                    //     offset: 16,
                                    //     span: 16,
                                    // }}
                                >
                                    <Button loading={loading} style={{width: '100%'}} type="primary" htmlType="submit">
                                        Enter
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="messages">
                            <div className="messages-box">
                                {messages?.map(item=>(
                                    <div className="message">
                                        <div className="message-title">
                                            {item.title}
                                        </div>
                                        <div className="message-text">
                                            {item.text}
                                        </div>
                                        <div className="author">
                                            {item.author?.name}
                                        </div>
                                    </div>
                                )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
