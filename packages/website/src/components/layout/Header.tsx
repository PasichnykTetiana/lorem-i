import "./Header.less";
import { Button, Col, Row, Typography, Menu, Dropdown, Space } from "antd";
import { type FC, useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import img from "./img/logo.png";
import { ShoppingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { observer } from "mobx-react-lite";
import { useBreakpoints } from "../../components/screen";
import Login from "./Login";
import { Context } from "../app";
import { SvgIcon } from "../icon/SvgIcon";

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const { store } = useContext(Context);
  const { isDesktop } = useBreakpoints();
  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };
  useEffect(() => {
    if (localStorage.getItem("token") && !store.isLoading) {
      store.checkCart();
    }
    console.log(store.cart.length);
  }, []);
  const data = [{ title: "About us", href: "/about" }];
  const items: MenuProps["items"] = [
    {
      label: <Login />,
      key: "0",
    },
    {
      label: (
        <div>
          <NavLink to="/registration">
            <Button type="primary" shape="round" size={"large"}>
              Registration
            </Button>
          </NavLink>
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <Row wrap={false} align={"middle"} justify={"space-between"}>
        <Col span={6}>
          <Link to={"/"}>
            {isDesktop ? <img width={"50%"} src={img} /> : "ddd"}
          </Link>
        </Col>
        <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            span={12}>
          {isDesktop ? (
            <Menu mode="horizontal">
              {data.map((it) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={it?.title}
                >
                  <SvgIcon type={"dot"} />
                  <Menu.Item>
                    <Link to={it?.href}>
                      <Typography.Title style={{ margin: 0 }} level={5}>
                        {it?.title}
                      </Typography.Title>
                    </Link>
                  </Menu.Item>
                  <SvgIcon type={"dot"} />
                </div>
              ))}
            </Menu>
          ) : (
              <img  width={"50%"} src={img} />
          )}
        </Col>
        {store.isAuth ? (
          <Col style={{ justifyContent: "end" }} span={6}>
            {/*<div style={{ width: "50%" }}>*/}
              <Row  gutter={16}  justify={"space-between"}>
                <Col>
                  <ShoppingOutlined />
                  {/* <Typography.Title level={5}> */}
                  {/*  {store.userName && store.userName} */}
                  {/* </Typography.Title> */}
                </Col>
                <Col>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    ({store.cart.length})
                  </Typography.Paragraph>
                </Col>
                {/* <ShoppingOutlined /> */}
                <Col>
                  <Button
                    onClick={async () => {
                      await store.logout();
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    Log out
                  </Button>
                </Col>
              </Row>
            {/*</div>*/}
          </Col>
        ) : (
            <Col
                style={{
                  display: "flex",
                  justifyContent: "end",
                }}
                span={6}>
          <Dropdown
            menu={{ items }}
            open={open}
            autoFocus={false}
            onOpenChange={handleOpenChange}
            trigger={["click"]}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
             <Space>Log in</Space>
            </a>
          </Dropdown>
            </Col>
        )}

      </Row>
    </>
  );
};

export default observer(Header);
