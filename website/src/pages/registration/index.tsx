import {FC, useEffect, useState,} from 'react'
import './index.less'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import axios from "axios";
import { registration } from "../../services/AuthServices";
import { NavLink } from "react-router-dom";
import $api from "../../http";

const Auth: FC = () => {
    const [form] = Form.useForm()
    const [appState, setAppState]= useState();
    const [registered, setRegistered] = useState<boolean>(false);


    async function getSongs(data: any): Promise<any> {
        const url = "http://localhost:5000/api/registration";
        const response = await  axios.post<any>(url, data);
        console.log(response.data)
        return response.data;
    }



    const onFinish = (data: AuthResponse) => {
        (async () => {
            try {
            const response = await registration(data);
                setRegistered(true)
            console.log(response, 'sdfdddddddddddddddddd')
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log('e.response?.data?.message');
        } })();
    }

    return (
        !registered ?<Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <div>Регистрация</div>
            <Form.Item
                label="Username"
                name="email"

                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input  />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password/>
            </Form.Item>

            {/*<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>*/}
            {/*    <Checkbox>Remember me</Checkbox>*/}
            {/*</Form.Item>*/}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>: <div>подтвердите

            <NavLink
                to="/login"
            >
               login
            </NavLink>

        </div>
    )
}

export { Auth as default }
