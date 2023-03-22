import "./index.less";
import {type FC, useEffect, useState} from "react";
import { HeroSection } from "../../components/section";
import SectionContainer from "../../components/section/SectionContainer";
import { useParams } from 'react-router-dom'
import ContentService from "../../services/ContentServices";

//import { We } from "./sections/index";

const Product: FC = () => {
    const { id } = useParams()
    const [card, setCard] = useState<Product>({});

    useEffect(() => {
        async function getProducts(x: string) {
            try {
                const response = await ContentService.fetchProduct(x);
                setCard(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        id && getProducts(id);
    }, []);

    console.log(card)
  return (
    <>
      <SectionContainer>
        {/*<HeroSection*/}
        {/*  // img={it.img}*/}
        {/*  title={"What is Lorem Ipsum?"}*/}
        {/*  subtitle={*/}
        {/*    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "*/}
        {/*  }*/}
        {/*/>*/}
          {card.title}
          <br/>

          {id}
          {card.title}
      </SectionContainer>
      <SectionContainer>
        {/*<We />*/}
      </SectionContainer>
    </>
  );
};

export default Product;
