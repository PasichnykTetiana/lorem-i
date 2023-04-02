import { Col, Row, Space, Typography, Collapse } from "antd";
import { type FC } from "react";
import { NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import SectionContainer from "../section/SectionContainer";
import img from "./img/logo.png";
import { useBreakpoints } from "../screen";

const Footer: FC = () => {
  const { isMobile } = useBreakpoints();

  const items = [
    {
      links: [{ name: "About us", link: "/about" }],
      title: "Sitemap",
    },
    {
      links: [
        { name: "none", link: "/" },
        { name: "none", link: "/" },
        { name: "none", link: "/" },
      ],
      title: "Social Media",
    },
    {
      links: [
        { name: "none", link: "/" },
        { name: "none", link: "/" },
        { name: "none", link: "/" },
      ],
      title: "Policies",
    },
  ];

  const { Panel } = Collapse;
  return (
    <SectionContainer theme={"footer"}>
      <Row
        gutter={isMobile ? [0, 16] : 18}
        justify={"space-between"}
        style={{
          borderTop: "1px solid rgba(255, 255, 255, .5)",
          color: "rgba(255,255,255, .8)",
          padding: "70px 0 50px",
        }}
      >
        <Col span={isMobile ? 8 : 5}>
          <NavLink to={"/"}>
            <img width={"100%"} src={img} />
          </NavLink>
        </Col>

        {isMobile
          ? items?.map((it, index) => {
              return (
                <Col span={24} key={index}>
                  <Collapse
                    accordion={true}
                    bordered={false}
                    expandIconPosition={"end"}
                    expandIcon={({ isActive }) => (
                      <DownOutlined rotate={isActive ? -180 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                  >
                    <Panel
                      key={index}
                      header={it.title}
                      className="site-collapse-custom-panel"
                    >
                      {it.links.map((it, index) => {
                        return (
                          <NavLink key={index} to={it.link}>
                            <Typography.Paragraph>
                              {" "}
                              {it.name}
                            </Typography.Paragraph>
                          </NavLink>
                        );
                      })}
                    </Panel>
                  </Collapse>
                </Col>
              );
            })
          : items?.map((it, index) => {
              return (
                <Col span={5} key={index}>
                  <Space size={8} direction={"vertical"}>
                    <Typography.Title level={3}>{it.title}</Typography.Title>
                    {it.links.map((it, index) => {
                      return (
                        <NavLink key={index} to={it.link}>
                          <Typography.Paragraph>
                            {" "}
                            {it.name}
                          </Typography.Paragraph>
                        </NavLink>
                      );
                    })}
                  </Space>
                </Col>
              );
            })}

        <Col className={"social"} span={4}></Col>
      </Row>
      <Row style={{ marginBottom: 70 }} justify={"space-between"}>
        <Col></Col>
        <Col>
          <Row>
            <Col>© Lorem I</Col>
          </Row>
        </Col>
      </Row>
    </SectionContainer>
  );
};
export { Footer };
