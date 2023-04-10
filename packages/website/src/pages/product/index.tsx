import "./index.less";
import { type FC, useEffect, useState } from "react";
import { Button, Col, Row, Typography, Image, Dropdown, Space } from "antd";
import { HeroSection } from "../../components/section";
import SectionContainer from "../../components/section/SectionContainer";
import { useParams } from "react-router-dom";
import ContentService from "../../services/ContentServices";
import { ButtonCart } from "../../components/layout/ButtonCart";
import { useBreakpoints } from "../../components/screen";

// import { We } from "./sections/index";

const Product: FC = () => {
  const { id } = useParams();
  const [card, setCard] = useState<Partial<Product>>({});
  const { isDesktop, isSM } = useBreakpoints();

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

  return (
    <SectionContainer>
      <Row style={{ alignItems: "center" }} justify={"space-between"}>
        <Col span={isDesktop ? 10 : 24}>
          {isDesktop ? (
            <Image src={card.photo} />
          ) : (
            <img width={"100%"} src={card.photo} alt={"product photo"} />
          )}
        </Col>
        <Col span={isDesktop ? 14 : 24}>
          <Typography.Title level={3}>{card.title}</Typography.Title>
          <Typography.Paragraph>{card.description}</Typography.Paragraph>
          <Typography.Paragraph>{card.price} $</Typography.Paragraph>
          <ButtonCart option={"add"} productId={card._id} />
        </Col>
      </Row>
    </SectionContainer>
  );
};

export default Product;
