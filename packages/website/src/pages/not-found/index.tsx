import { type FC } from "react";
import { Button, Result } from "antd";
import "./index.less";
import img from "./img/ghost.png";
import { NavLink } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <Result
      icon={<img src={img} />}
      title={"Coming soon"}
      extra={
        <NavLink to={"/"}>
          <Button key="console" shape="round" size={"large"}>
            HOME
          </Button>
        </NavLink>
      }
    ></Result>
  );
};

export { NotFound as default };
