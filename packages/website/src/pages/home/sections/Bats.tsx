import './Bats.less'
import ScrollAnimation from 'react-animate-on-scroll'

import { Button, Col, Row, Typography } from 'antd'
import { type FC } from 'react'

import img from './img/bats.png'
import { useBreakpoints } from '../../../components/screen'

const Bats: FC = () => {
  const { isMobile } = useBreakpoints()

  return (
        <Row gutter={isMobile ? [0, 64] : 0} className={'bats'}>
            <Col order={isMobile ? 2 : 1} className={'img-container'} span={isMobile ? 24 : 12}>
                <ScrollAnimation animateIn='fadeIn' duration={1.5}>
                    <img src={img} alt={'bats'}/>
                </ScrollAnimation>
            </Col>
            <Col order={isMobile ? 1 : 2} className={'content'} offset={2} span={isMobile ? 24 : 10}>
                <div className={'block'}>
                    <Typography.Title level={2}>Phasellus pretium dui ac tincidunt efficitur. </Typography.Title>
                    <Typography.Paragraph>
                        Donec porttitor ullamcorper mauris, ut sodales nisi auctor nec. Quisque et hendrerit orci.
                    </Typography.Paragraph>
                    <Button disabled type='primary' shape='round' size={'large'}>
                        GET STARTED
                    </Button>
                </div>
            </Col>
        </Row>
  )
}

export { Bats }
