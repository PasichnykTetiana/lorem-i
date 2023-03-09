import "./HeroSection.less";

import { Button, Col, Row, Typography } from "antd";
import { type FC, type ReactNode } from "react";
import { useBreakpoints } from "../screen";

type Home = {
  title: string;
  img?: string;
  subtitle?: string;
  info?: string;
};

const HeroSection: FC<
  Partial<
    Home & { children?: ReactNode; button?: { href: string; text: string } }
  >
> = ({ title, subtitle, img, info, children = "", button }) => {
  const { isDesktop } = useBreakpoints();

  return (
    <Row className={"hero"} align={"middle"} justify={"center"}>
      <Col span={isDesktop ? 12 : 24}>
        {info && (
          <Typography.Title level={5} className={"step"}>
            {info}
          </Typography.Title>
        )}
        <Typography.Title level={1}>{title}</Typography.Title>
        {subtitle && <Typography.Paragraph>{subtitle}</Typography.Paragraph>}
        {children}
        {button != null && (
          <Row>
            <Button
              href={button.href}
              type="primary"
              shape="round"
              size={"large"}
            >
              {button.text}
            </Button>
          </Row>
        )}
      </Col>
      <Col span={isDesktop ? 12 : 24}>
        <img src={img} alt={""} />
      </Col>
    </Row>
  );
};

export { HeroSection };
