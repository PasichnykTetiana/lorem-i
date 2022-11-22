import {FC, useEffect, useState,} from 'react'
import './index.less'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import axios from "axios";
import { useContext} from 'react';
import { login } from "../../services/AuthServices";
import {AxiosResponse} from "axios";
import $api from "../../http";
import {Context} from "../../main"

const Login: FC = () => {
    const [form] = Form.useForm()
    const [appState, setAppState]= useState();
    const [songs, setSongs] = useState<any>([]);
    const {store} = useContext(Context);
    async function getSongs(data: any): Promise<any> {
        const url = "http://localhost:5000/api/registration";
        const response = await axios.post<any>(url, data);
        console.log(response.data.user.isActivated)
        return response.data;
    }

    const onFinish = (data: AuthResponse) => {
    store.login(data)
        console.log(store.isAuth)
     //    (async () => {
     //        try {
     //        const response = await login(data);
     //        localStorage.setItem('token', response.data.accessToken);
     //    } catch (e) {
     //        console.log('e.response?.data?.message');
     //    } })();
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            {/*<button onClick={() => store.lala()}>*/}
            {/*    Логин*/}
            {/*</button>*/}
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
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export { Login as default }
