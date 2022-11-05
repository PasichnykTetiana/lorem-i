import { Col, Row, Space, Typography } from 'antd'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import SectionContainer from '../section/SectionContainer'
import img from "./img/logo.png";

const Footer: FC = () => (
  <SectionContainer theme={'footer'}>
    <Row gutter={32} justify={'space-between'} style={{  borderTop: '1px solid rgba(255, 255, 255, .5)', color: 'rgba(255,255,255, .8)', padding: '70px 0 50px'  }}>
      <Col span={3}>
        <NavLink to={'/'}>
          <img  width={'100%'} src={img} />
        </NavLink>
      </Col>
      <Col span={5}>
        <Space size={8} direction={'vertical'}>
          <Typography.Title level={3}>Sitemap</Typography.Title>
          <NavLink  to={'/'}>
            <Typography.Paragraph> None</Typography.Paragraph>
          </NavLink>
          <NavLink  to={'/'}>
            <Typography.Paragraph> None</Typography.Paragraph>
          </NavLink>
          <NavLink  to={'/'}>
            <Typography.Paragraph> None</Typography.Paragraph>
          </NavLink>
        </Space>
      </Col>
      <Col span={5}>
        <Space size={8} direction={'vertical'}>
          <Typography.Title level={3}>Social Media</Typography.Title>
          <NavLink  to={'/'}>
            <Typography.Paragraph> None</Typography.Paragraph>
          </NavLink>
          <NavLink  to={'/'}>
            <Typography.Paragraph> None</Typography.Paragraph>
          </NavLink>
          <NavLink  to={'/'}>
            <Typography.Paragraph> None</Typography.Paragraph>
          </NavLink>
        </Space>
      </Col>
      <Col span={5}>
        <Space size={8} direction={'vertical'}>
        <Typography.Title level={3}>Policies</Typography.Title>
          <NavLink  to={'/erser'}>
            <Typography.Paragraph> None</Typography.Paragraph>
          </NavLink>
          <NavLink  to={'/'}>
            <Typography.Paragraph> None</Typography.Paragraph>
          </NavLink>
          <NavLink  to={'/'}>
            <Typography.Paragraph> None</Typography.Paragraph>
          </NavLink>
        </Space>
      </Col>
      <Col className={'social'} span={6}>
      </Col>
    </Row>
    <Row style={{ marginBottom: 70}} justify={'space-between'} >
      <Col></Col>
      <Col>
        <Row gutter={[32, 0]}>
          <Col>© Lorem I</Col>
        </Row>
      </Col>
    </Row>
  </SectionContainer>
)

export { Footer }
