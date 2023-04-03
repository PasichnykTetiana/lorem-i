import { Col, Typography } from "antd";
import { type FC, useContext, useEffect } from "react";
import { ShoppingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Modal, Row } from "antd";
import "./Cart.less";
import ContentService from "../../services/ContentServices";
import { Context } from "../app";
const Cart: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
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
    const cardData = [] as any;
    async function getProducts() {
      try {
        for (const item of store.cart) {
          const response = await ContentService.fetchProduct(item.product);
          cardData.push(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    setProduct(cardData);
    getProducts();
  }, [store.cart]);

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
        {product?.map((item: Product, index) => {
          return (
            <Row key={item._id} gutter={[40, 0]} justify={"center"}>
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
                  quantity : {store.cart[index].quantity.toString()}
                </Typography.Paragraph>
              </Col>
              <Col span={6}>
                <Typography.Paragraph>
                  {(store.cart[index].quantity * item.price).toString()} $
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
