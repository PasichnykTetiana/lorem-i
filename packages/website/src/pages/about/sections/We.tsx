import "./We.less";
import Slider, { type Settings } from "react-slick";
import { Col, Row, Image } from "antd";
import { type FC, Fragment, useEffect, useState } from "react";
import { useBreakpoints } from "../../../components/screen";
import ContentService from "../../../services/ContentServices";
import placeholder1 from "./images/avatar-placeholder-0.png";
import placeholder2 from "./images/avatar-placeholder-1.png";
import placeholder3 from "./images/avatar-placeholder-2.png";

const placeholders = [placeholder1, placeholder2, placeholder3] as const;

const pinnedOccupations = ["Director", "Leading actor", "Chief Legal Officer"];

const StaffCarousel: FC<{ data: Person[] }> = ({ data = [] }) => {
  const { isMobile, isMD, isXL } = useBreakpoints();

  let slideCount;
  let width = 100;

  if (isMobile) {
    slideCount = 1;
    width = 80;
  } else if (isMD) {
    slideCount = 2;
    width = 40;
  } else if (isXL) {
    slideCount = 3;
    width = 25;
  }

  const settings: Settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 600,
    slidesToShow: slideCount,
    slidesToScroll: slideCount,
  };

  return (
    <div className="swiper">
      <Slider {...settings}>
        {data.map((item, index) => (
          <li className="item" key={item._id}>
            <div className="item-wrapper">
              <div style={{ width: `${width}vw` }} className="img-block">
                <Image
                  src={item.photo ? item.photo : placeholders[index % 3]}
                  className="img"
                />
              </div>
              <p className="name">{item.name}</p>
              <p className="occupation">{item.occupation}</p>
            </div>
          </li>
        ))}
      </Slider>
    </div>
  );
};

const StaffGrid: FC<
  Partial<{ data: Person[]; defaultItemsToShow: number }>
> = ({ data = [], defaultItemsToShow = 13 }) => {
  const [isViewMore, setIsViewMore] = useState(false);

  const handleOpenStaff = () => {
    setIsViewMore((prevState) => !prevState);
    const html = document.querySelector("html");
    html?.classList.add("unscrollable");

    setTimeout(() => {
      html?.classList.remove("unscrollable");
    }, 10);
  };

  const viewMoreClass: string = isViewMore ? "list-visible" : "list-hidden";

  return (
    <ul className={`about-list ${viewMoreClass}`}>
      {data?.map((item, index) => {
        if (index === defaultItemsToShow) {
          return (
            <Fragment key={index}>
              <li className={"more-wrapper"}>
                <div className="more-block" onClick={handleOpenStaff}>
                  <p
                    style={{ display: isViewMore ? "none" : "initial" }}
                    className="more-text statistics-item-num"
                  >
                    <span className="more-symbol">+</span>
                    {data?.length - defaultItemsToShow}
                  </p>
                </div>
              </li>
              <li className="item">
                <div className="item-wrapper">
                  <div className="img-block">
                    <Image
                      src={item.photo ? item.photo : placeholders[index % 3]}
                      className="img"
                    />
                  </div>
                  {item.name && <p className="name">{item.name}</p>}
                  {item.occupation && (
                    <p className="occupation">{item.occupation}</p>
                  )}
                </div>
              </li>
            </Fragment>
          );
        }

        return (
          <li
            className="item"
            key={index}
            style={index >= 10 ? { animationDelay: `0.${index}s` } : {}}
          >
            <div className="item-wrapper">
              <div className="img-block">
                <Image
                  src={item.photo ? item.photo : placeholders[index % 3]}
                  className="img"
                />
              </div>
              {item.name && <p className="name">{item.name}</p>}
              {item.occupation && (
                <p className="occupation">{item.occupation}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const We: FC = () => {
  const [we, setWe] = useState<Person[]>([]);

  useEffect(() => {
    async function getWe() {
      try {
        const response = await ContentService.fetchWe();
        setWe(response.data);
      } catch (e) {
        console.log(e);
      }
    }

    getWe();
  }, []);

  const { isXL } = useBreakpoints();

  const filteredAndSorted = we
    .filter((obj) => pinnedOccupations.includes(obj.occupation))
    .sort(
      (a, b) =>
        pinnedOccupations.indexOf(a.occupation) -
        pinnedOccupations.indexOf(b.occupation)
    );

  const mixed = we
    .filter((obj) => !pinnedOccupations.includes(obj.occupation))
    .sort(() => Math.random() - 0.5);

  const staff = filteredAndSorted.concat(mixed);

  return (
    <Row gutter={isXL ? [0, 64] : 0} className={"about-list"}>
      <Col span={24}>
        {isXL ? <StaffCarousel data={staff} /> : <StaffGrid data={staff} />}{" "}
      </Col>
    </Row>
  );
};

export { We };
