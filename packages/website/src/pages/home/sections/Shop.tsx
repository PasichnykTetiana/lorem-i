import "./Shop.less";
import ScrollAnimation from "react-animate-on-scroll";

import {Col, Row, List, Typography, Image} from "antd";
import {Link} from 'react-router-dom'
import {type FC, useEffect, useState} from "react";
import SectionContainer from "../../../components/section/SectionContainer";

import card1 from "./img/card.png";
import card2 from "./img/card2.png";
import card3 from "./img/card3.png";
import {useBreakpoints} from "../../../components/screen";
import ContentService from "../../../services/ContentServices";

const Shop: FC = () => {

    const [cards, setCards] = useState<Product[]>([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await ContentService.fetchAllProducts();
                setCards(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        getProducts();
    }, []);

    const {isMD} = useBreakpoints();
    const heightTitle = 78;
    const heightLine = 1;
    const widthLine = 90;

    return (
        <SectionContainer>
            <List
                style={{maxWidth: '100% '}}
                itemLayout='vertical'
                size='large'
                dataSource={cards || []}
                grid={{
                    gutter: 20,
                    xs: 1,
                    md: 2,
                    lg: 2,
                    xl: 3,
                    xxl: 3,
                }}
                pagination={{pageSize: 6, hideOnSinglePage: true}}
                renderItem={(item, index) => (
                    <List.Item style={index >= 1 ? {animationDelay: `0.${index}s`} : {}} key={item?._id}
                               className='product-card'>
                        <Link to={`/product/${item?._id}`}>
                            {item.photo && <Image
                                src={item.photo}
                                className="img"
                            />}
                            <Typography.Title level={3}>{item?.title}</Typography.Title>
                            <Typography.Paragraph>{item?.description}</Typography.Paragraph>
                        </Link>

                    </List.Item>
                )}
            />
            {/*<div id={"invest"}>*/}
            {/*    <Row align={"middle"} style={{ marginBottom: 100 }}>*/}
            {/*        <Col span={18}>*/}
            {/*            <Typography.Title level={2}>*/}
            {/*                Shop Shop Shop*/}
            {/*            </Typography.Title>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*    <Row justify={isMD ? "center" : "space-between"}>*/}
            {/*        {cards?.map((it: any) => (*/}
            {/*            <Col span={isMD ? 25 : 7} key={it.title} className={"cards"}>*/}
            {/*                    <img*/}
            {/*                        src={it.src}*/}
            {/*                        alt={it.title}*/}
            {/*                        style={{ width: "100%", objectFit: "cover" }}*/}
            {/*                    />*/}
            {/*                    <div*/}
            {/*                        style={{*/}
            {/*                            position: "relative",*/}
            {/*                            top: -heightTitle,*/}
            {/*                            right: 0,*/}
            {/*                            left: `${100 - widthLine}%`,*/}
            {/*                            width: `${widthLine}%`,*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        <div style={{ background: "white", height: 1 }} />*/}
            {/*                        <Row*/}
            {/*                            align={"middle"}*/}
            {/*                            style={{ height: heightTitle - heightLine }}*/}
            {/*                        >*/}
            {/*                            <Typography.Title level={3}>{it.title}</Typography.Title>*/}
            {/*                        </Row>*/}
            {/*                    </div>*/}
            {/*            </Col>*/}
            {/*        ))}*/}
            {/*    </Row>*/}
            {/*</div>*/}
        </SectionContainer>
    );
};

export {Shop};
