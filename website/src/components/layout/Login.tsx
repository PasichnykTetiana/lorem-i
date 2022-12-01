import {FC, useEffect, useState,} from 'react'
import './index.less'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import axios from "axios";
import { useContext} from 'react';
import {login, users} from "../../services/AuthServices";
import {AxiosResponse} from "axios";
import $api from "../../http";
//import {Context} from "../../main"
import {Context} from "../app"
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

const Login: FC = () => {
    const [form] = Form.useForm()
    const [appState, setAppState]= useState();
    const [user, setUser] = useState<any>({});
    const {store} = useContext(Context);

    const onFinish = (data: Data) => {
        store.login(data)
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
            <Form.Item
                label="Email"
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
                    Log in
                </Button>
            </Form.Item>
        </Form>
    )
}

export default observer(Login)
