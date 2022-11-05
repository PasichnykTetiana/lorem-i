import './index.less'
import { Carousel } from "antd";

import { FC } from 'react'
import { HeroSection } from '../../components/section'
import SectionContainer from "../../components/section/SectionContainer";
import jack from './img/jack.png'
import img from './img/images.png'
import img2 from './img/images2.png'
import { Card, Bats } from './sections/index'

const Home: FC = () => {

  const hero = [
    {
      img: jack,
      title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      button: {href: '#', text: 'About managment'}
    },
    {
      img: img2,
      title: 'Lorem ipsum dolor sit amet, consectetuer',
      subtitle: 'Malesuada fames ac turpis egestas integer eget aliquet nibh praesent.',
      button: {href: '#', text: 'Sell property'}
    },
    {
      img: img,
      title: 'Lorem ipsum dolor sit',
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
          dots={{className: 'carousel'}}
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
