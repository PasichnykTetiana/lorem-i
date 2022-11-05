import './Bats.less'

import { Button, Col, Row, Typography } from 'antd'
import { FC } from 'react'

import img from './img/bats.png'

const Bats: FC = () => {
  return (
    <Row className={'bats'}>
      <Col className={'img-container'} span={12}>
        <img src={img} alt={'bats'} />
      </Col>
      <Col className={'content'} offset={2} span={10}>
        <div className={'block'}>
          <Typography.Title level={2}>Phasellus pretium dui ac tincidunt efficitur. </Typography.Title>
          <Typography.Paragraph>
              Donec porttitor ullamcorper mauris, ut sodales nisi auctor nec. Quisque et hendrerit orci.
          </Typography.Paragraph>
          <Button type='primary' shape='round' size={'large'}>
            GET STARTED
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export { Bats }
