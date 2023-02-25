import './index.less'
import { FC} from 'react'
import { HeroSection } from '../../components/section'
import SectionContainer from "../../components/section/SectionContainer";

const About: FC = () => {

  return (
    <>
      <SectionContainer >
          <HeroSection
              // img={it.img}
              title={'What is Lorem Ipsum?'}
              subtitle={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. '}
          />
      </SectionContainer>
      <SectionContainer theme={'grey'}>
      </SectionContainer>
    </>
  )
}

export default About
