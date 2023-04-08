import "./index.less";
import {type FC, useEffect, useState} from "react";
import {Button, Col, Row, Typography, Image, Dropdown, Space} from "antd";
import {HeroSection} from "../../components/section";
import SectionContainer from "../../components/section/SectionContainer";
import {useParams} from "react-router-dom";
import ContentService from "../../services/ContentServices";
import {ButtonCart} from "../../components/layout/ButtonCart";

// import { We } from "./sections/index";

const Product: FC = () => {
    const {id} = useParams();
    const [card, setCard] = useState<Partial<Product>>({});

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
                <Row style={{alignItems: 'center'}} justify={'space-between'}>
                    <Col span={10}>
                        <Image src={card.photo}/>
                    </Col>
                    <Col span={14}>
                        <Typography.Title level={3}>
                            {card.title}
                        </Typography.Title>
                        <Typography.Paragraph >
                            {card.description}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            {card.price} $
                        </Typography.Paragraph>
                        <ButtonCart option={'add'} productId={card._id} />
                    </Col>
                </Row>
            </SectionContainer>
    );
};

export default Product;
