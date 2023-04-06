import "./Shop.less";

import { List, Typography, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { type FC, useEffect, useState, CSSProperties } from "react";
import SectionContainer from "../../../components/section/SectionContainer";
import { ButtonCart } from "../../../components/layout/ButtonCart";
import { useBreakpoints } from "../../../components/screen";
import ContentService from "../../../services/ContentServices";

const Shop: FC = () => {
  const [cards, setCards] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { isDesktop, isSM } = useBreakpoints();
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

  return (
      <Row className={"shop"}>
          <Col>
            <Typography.Title level={1}>
                Rubber ducks
            </Typography.Title>
          </Col>

      <List
        style={{ maxWidth: "100% " }}
        itemLayout="vertical"

        size="large"
        dataSource={cards || []}
        grid={{
          gutter: 20,
          xs: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        pagination={{ pageSize: 6, hideOnSinglePage: true }}
        renderItem={(item, index) => {
          const isActive = activeIndex === index;
          const className = `product-card ${isActive ? "active" : ""}`;

          const handleClick = (index: number) => {
            setActiveIndex(index);
          };
          const linkStyles: CSSProperties = !isDesktop
            ? index === activeIndex
              ? { pointerEvents: "auto" }
              : { pointerEvents: "none" }
            : { pointerEvents: "auto" };

          return (
            <List.Item
              style={index >= 1 ? { animationDelay: `0.${index}s` } : {}}
              key={item?._id}
              onClick={() => handleClick(index)}
              className={className}
            >
              <Card hoverable style={{ background: "transparent" }}>
                {" "}
                <Link style={linkStyles} to={`/product/${item?._id}`}>
                  {item.photo && (
                    <img
                      src={item.photo}
                      className="img"
                    />
                  )}
                  <Typography.Title level={3}>{item?.title}</Typography.Title>
                  <Typography.Paragraph type={"secondary"}>
                    {item?.subtitle}
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    {item?.price?.toString()} $
                  </Typography.Paragraph>
                </Link>
                <ButtonCart option={'add'} productId={item?._id} />
              </Card>
            </List.Item>
          );
        }}
      />
      </Row>
  );
};

export { Shop };
