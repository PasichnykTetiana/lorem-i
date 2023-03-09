import { type FC, useEffect, useState } from 'react'
import './index.less'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { useContext } from 'react'
import { login } from '../../services/AuthServices'

import $api from '../../http'
// import {Context} from "../../main"
import { Context } from '../../components/app'

const Login: FC = () => {
  const [form] = Form.useForm()
  const [appState, setAppState] = useState()
  const [songs, setSongs] = useState<any>([])
  const { store } = useContext(Context)

  const onFinish = (data: Data) => {
    store.login(data)
    // console.log(store.checkAuth())
    // store.checkAuth()
    console.log(store.isAuth)
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
                label="Username"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
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
