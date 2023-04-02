import {Col, Typography} from "antd";
import {type FC, useContext, useMemo, useEffect} from "react";
import {ShoppingOutlined} from "@ant-design/icons";
import {useState} from 'react';
import {Modal, Row} from 'antd';
import "./Cart.less";
import ContentService from "../../services/ContentServices";
import {useParams} from "react-router-dom";
import {Context} from "../app";

const Cart: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [product, setProduct] = useState<Partial<Product[]>>([])
    const {store} = useContext(Context);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const cards = useMemo(() => {
        const cardData = [] as any;

        async function getProducts() {
            try {
                for (const item of store.cart) {
                    const response = await ContentService.fetchProduct(item);
                    cardData.push(response.data);
                }
            } catch (e) {
                console.log(e);
            }
        }

        getProducts();
        return cardData;
    }, []);

    useEffect(() => {
        setProduct(cards)
    }, []);

    console.log(cards)

    return (
        <Col>
            <ShoppingOutlined onClick={showModal}/>
            <Modal title="Cart" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {product.map((item?: Product, index?: number) => {
                    return (<Row justify={'center'}>
                        <Col style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}} span={24}>
                        <img style={{width: "80%"}} src={item?.photo}/>
                        <Typography.Title level={3}>{item?.title}</Typography.Title>
                        <Typography.Paragraph type={"secondary"}>
                            {item?.description}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            {item?.price?.toString()} $
                        </Typography.Paragraph>
                    </Col></Row>)
                })}
            </Modal>
        </Col>
    );
};
export {Cart};
