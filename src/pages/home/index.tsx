import './index.less'
import { Carousel } from "antd";
import { useBreakpoints } from '../../components/screen'
import { FC } from 'react'
import { DownOutlined  } from '@ant-design/icons';

import { HeroSection } from '../../components/section'
import SectionContainer from "../../components/section/SectionContainer";
import { Card, Bats } from './sections/index'
import jack from './img/jack.png'
import img from './img/images.png'
import img2 from './img/images2.png'
import {SvgIcon} from "../../components/icon/SvgIcon";


const Home: FC = () => {
  const { isMD } = useBreakpoints()

  const hero = [
    {
      img: jack,
      title: 'Nullam in feugiat nisl, sed egestas justo',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      button: {href: '#', text: 'About managment'}
    },
    {
      img: img2,
      title: 'Ut sit amet odio sed elit fringilla gravida',
      subtitle: 'Malesuada fames ac turpis egestas integer eget aliquet nibh praesent.',
      button: {href: '#', text: 'Sell property'}
    },
    {
      img: img,
      title: 'Aliquam pellentesque a purus eget sodales',
      subtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo.',
      button: {href: '#', text: 'View listing'}
    },
  ]

  return (
    <>
      <SectionContainer >
        <Carousel
          effect="fade"
          style={{maxWidth: '100vw'}}
          dots={!isMD && true}
          arrows={isMD && true}
          prevArrow={<SvgIcon  fill={'#b6acf0'} type={'arrowPrev'}/>}
          nextArrow={<SvgIcon fill={'#b6acf0'} type={'arrowNext'} />}
        >
          {hero.map((it, i) => (
              <HeroSection
              key={i}
              img={it.img}
              title={it.title}
              subtitle={it.subtitle}
            />
          ))}

        </Carousel>
      </SectionContainer>
          <Card  />
      <SectionContainer theme={'grey'}>
        <Bats />
      </SectionContainer>
    </>
  )
}

export { Home as default }
