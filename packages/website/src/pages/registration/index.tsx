import { type FC, useContext, useEffect } from "react";
import "./index.less";
import { Button, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
import { Context } from "../../components/app";
import { observer } from "mobx-react-lite";
import SectionContainer from "../../components/section/SectionContainer";
import { useBreakpoints } from "../../components/screen";

const Auth: FC = () => {
  const [form] = Form.useForm();
  const { store } = useContext(Context);
  const { isSM } = useBreakpoints();

  const onFinish = (data: Data) => {
    store.registration(data);
    // if (localStorage.getItem("token")) {
    //   store.checkAuth();
    // }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <SectionContainer>
      {!store.isRegistration ? (
        <Form
          name="data"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
          className={"contact-wrapper"}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                type: "string",
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                type: "string",
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: !isSM ? 8 : 0, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <NavLink to="/">активирйте свой акк по емсейол
          {/*<Button type="primary" htmlType="submit">*/}
          {/*  Homepage*/}
          {/*</Button>*/}
        </NavLink>
      )}
    </SectionContainer>
  );
};

export default observer(Auth);
