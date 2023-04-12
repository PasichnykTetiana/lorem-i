import { type FC, useState } from "react";
import { Menu, type MenuProps, Row, Drawer, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { useBreakpoints } from "../screen";
import { SvgIcon } from "../icon/SvgIcon";

const data: Readonly<Array<{ title: string; href: string }>> = [
  { title: "About us", href: "/about" },
] as const;

const NavigationMenu: FC<Partial<MenuProps>> = () => (
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
          <NavLink to={it?.href}>
            <Typography.Title style={{ margin: 0 }} level={5}>
              {it?.title}
            </Typography.Title>
          </NavLink>
        </Menu.Item>
        <SvgIcon type={"dot"} />
      </div>
    ))}
  </Menu>
);

const Navigation: FC = () => {
  const [visible, setVisible] = useState(false);
  const { isDesktop, isSM } = useBreakpoints();

  return (
    <Row align={"middle"} justify={"space-between"} style={{ width: "100%" }}>
      {isDesktop ? (
        <NavigationMenu />
      ) : (
        <Row justify={"end"} align={"middle"}>
          <Row
            onClick={() => {
              setVisible(true);
            }}
          >
            <MenuOutlined />
          </Row>
          <Drawer
            drawerStyle={{ textAlign: "center" }}
            title="Menu"
            width={isSM ? "100%" : "50%"}
            placement="right"
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
          >
            <NavigationMenu
              onClick={() => {
                setVisible(false);
              }}
              mode={"vertical"}
            />
          </Drawer>
        </Row>
      )}
    </Row>
  );
};

export { Navigation };
