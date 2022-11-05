import { Button, Col, Row, Space, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import SectionContainer from '../section/SectionContainer'
import img from "./img/logo.png";

const Footer: FC = () => (
  <SectionContainer theme={'footer'}>
    <Row gutter={32} justify={'space-between'} style={{  borderTop: '1px solid rgba(255, 255, 255, .5)', color: 'rgba(255,255,255, .8)', padding: '70px 0 50px'  }}>
      <Col span={3}>
        <Link to={'/'}>
          <img  width={'100%'} src={img} />
        </Link>
      </Col>
      <Col span={5}>
        <Space size={18} direction={'vertical'}>
          <Typography.Title level={3}>Sitemap</Typography.Title>
          <Button href={'#'} type={'link'}>
            None
          </Button>
          <Button href={'list-of-marketplace'} type={'link'}>
            None
          </Button>
          <Button href={'offers'} type={'link'}>
            None
          </Button>
        </Space>
      </Col>
      <Col span={5}>
        <Space size={18} direction={'vertical'}>
          <Typography.Title level={3}>Social Media</Typography.Title>
          <Button href={'portfolio'} type={'link'}>
            None
          </Button>
          <Button href={'property-management'} type={'link'}>
            None
          </Button>
          <Button href={'how-it-works'} type={'link'}>
            None
          </Button>
        </Space>
      </Col>
      <Col span={5}>
        <Typography.Title level={3}>Policies</Typography.Title>
        <Space size={18} direction={'vertical'}>

          <Button href={'#'} type={'link'}>
            None
          </Button>
          <Button href={'#'} type={'link'}>
            None
          </Button>
          <Button href={'contacts'} type={'link'}>
            None
          </Button>
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
