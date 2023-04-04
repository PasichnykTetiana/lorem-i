import { Col, Typography } from "antd";
import { type FC, useContext, useEffect } from "react";
import { ShoppingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Modal, Row } from "antd";
import "./Cart.less";
import ContentService from "../../services/ContentServices";
import { Context } from "../app";
import { ButtonCart } from "./ButtonCart";

const Cart: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<Partial<Product[]>>([]);
  const { store } = useContext(Context);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const cardData = [] as Product[];
    async function getProducts() {
      try {
        for (const item of store.cart) {
          const response = await ContentService.fetchProduct(item.product);
          console.log(response.data, 'response.data')
          cardData.push(response.data);
        }
      } catch (e) {
        console.log(e);
      }
      finally {
        setProduct(cardData);
      }
    }
    getProducts();
    if(store.cart.length === 0){
      setIsModalOpen(false);
    }
  }, [store.cart.length]);

  return (
    <Col>
      <ShoppingOutlined style={{ color: "#01e0b7" }} onClick={showModal} />
      <Modal
        width={"80%"}
        style={{ maxWidth: 800 }}
        title="Cart"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {product.map((item?: Product, index?) => {
          return (
            <Row key={item?._id} gutter={[40, 0]} justify={"center"}>
              <Col span={6}>
                <img style={{ width: "100%" }} src={item?.photo} />
              </Col>
              <Col
                span={12}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Typography.Title level={3}>{item?.title}</Typography.Title>
                <Typography.Paragraph type={"secondary"}>
                  {item?.description}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  <ButtonCart description={'-'} option={'delete'} type={'ghost'} productId={store.cart[index]?.product}/>
                  &nbsp;{store.cart[index]?.quantity.toString()}&nbsp;
                  <ButtonCart description={'+'} option={'add'} type={'ghost'} productId={store.cart[index]?.product}/>
                </Typography.Paragraph>
              </Col>
              <Col span={6}>
                <Typography.Paragraph>
                  {item && (store.cart[index]?.quantity * item.price).toString()} $
                </Typography.Paragraph>
              </Col>
            </Row>
          );
        })}
      </Modal>
    </Col>
  );
};
export { Cart };
