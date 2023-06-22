import { type FC } from "react";
import "./index.less";
import { Button, Form, Input, Typography } from "antd";
import { useContext } from "react";

import { Context } from "../app";
import { observer } from "mobx-react-lite";

const Login: FC = () => {
  const { store } = useContext(Context);

  const onFinish = (data: Data) => {
    console.log(data)
    store.login(data);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {!store.isAuth && store.userName && <Typography.Paragraph style={{ textAlign: "center" }} >
        You must confirm your email address
      </Typography.Paragraph>}
      {store.userName === null && <Typography.Paragraph style={{ textAlign: "center" }} >
        Email or password entered incorrectly
      </Typography.Paragraph>}
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(Login);
