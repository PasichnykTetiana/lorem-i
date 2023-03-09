import './Card.less'
import ScrollAnimation from 'react-animate-on-scroll'

import { Col, Row, Typography } from 'antd'
import { type FC } from 'react'
import SectionContainer from '../../../components/section/SectionContainer'

import card1 from './img/card.png'
import card2 from './img/card2.png'
import card3 from './img/card3.png'
import { useBreakpoints } from '../../../components/screen'

const Card: FC = () => {
  const cards = [
    { title: 'Lorem ipsum', src: card1 },
    { title: 'Sed ut perspiciatis', src: card2 },
    { title: 'Lorem ipsum dolor', src: card3 }
  ]
  const { isMD } = useBreakpoints()
  const heightTitle = 78
  const heightLine = 1
  const widthLine = 90

  return (
    <SectionContainer >
      <div id={'invest'}>
        <Row align={'middle'} style={{ marginBottom: 100 }}>
          <Col span={18}>
            <Typography.Title level={2}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            </Typography.Title>
          </Col>
        </Row>
        <Row justify={isMD ? 'center' : 'space-between'} >
          {cards?.map(it => (
            <Col span={isMD ? 25 : 7} key={it.title} className={'cards'}>
              <ScrollAnimation animateIn="fadeInRight">
              <img src={it.src} alt={it.title} style={{ width: '100%', objectFit: 'cover' }}/>
              <div style={{ position: 'relative', top: -heightTitle, right: 0, left: `${100 - widthLine}%`, width: `${widthLine}%` }}>
                <div style={{ background: 'white', height: 1 }}/>
                <Row align={'middle'} style={{ height: heightTitle - heightLine }}>
                  <Typography.Title level={3}>
                    {it.title}
                  </Typography.Title>
                </Row>
              </div>
              </ScrollAnimation>
            </Col>
          ))}
        </Row>
      </div>
    </SectionContainer>
  )
}

export { Card }
