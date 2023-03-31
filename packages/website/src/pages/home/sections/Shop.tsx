import "./Shop.less";
import ScrollAnimation from "react-animate-on-scroll";

import {List, Typography, Image} from "antd";
import {Link} from 'react-router-dom'
import {type FC, useEffect, useState} from "react";
import SectionContainer from "../../../components/section/SectionContainer";
import {ButtonCart} from "../../../components/layout/ButtonCart";
import {useBreakpoints} from "../../../components/screen";
import ContentService from "../../../services/ContentServices";
import {Card} from 'antd';

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
                        <Card
                            hoverable
                            style={{background: "transparent"}}
                            cover={item.photo && <Image
                                src={item.photo}
                                className="img"
                            />}
                        >
                            <Link to={`/product/${item?._id}`}>
                                {/*{item.photo && <Image*/}
                                {/*    src={item.photo}*/}
                                {/*    className="img"*/}
                                {/*/>}*/}

                                <Typography.Title level={3}>{item?.title}</Typography.Title>
                                <Typography.Paragraph type={'secondary'}>{item?.description}</Typography.Paragraph>
                                <Typography.Paragraph>{item?.price?.toString()} $</Typography.Paragraph>
                            </Link>
                            <ButtonCart productId={item?._id}/>
                        </Card>
                    </List.Item>
                )}
            />
        </SectionContainer>
    );
};

export {Shop};
