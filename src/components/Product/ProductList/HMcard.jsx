import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "./HMcard.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Card } from "react-bootstrap";

export default () => {
  return (
    <Swiper
      breakpoints={{
        // when window width is >= 640px
        320: {
          width: 312,
          slidesPerView: 1,
          height: 30,
        },
        425: {
          width: 400,
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          width: 768,
          slidesPerView: 3,
          height: 100,
        },
        1024: {
          width: 780,
          height: 100,

          slidesPerView: 3,
        },
        1440: {
          width: 1150,
          slidesPerView: 3,
        },
      }}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://images.kikocosmetics.com/sys-master/images/h86/h60/9397589180446/KM0010400100544principale_900Wx900H.jpg#k-zoom"
          />
          <Card.Body>
            <Card.Title>Velvet Touch Creamy Stick Blush</Card.Title>
            <Card.Text>$ 14.00</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://images.kikocosmetics.com/sys-master/images/h39/hb3/9919206260766/KM0050103000044principale_900Wx900H#k-zoom"
          />
          <Card.Body>
            <Card.Title>Velvet Touch Creamy Stick Blush</Card.Title>
            <Card.Text>$ 14.00</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://images.kikocosmetics.com/sys-master/images/hef/h2e/10957493043230/KM000000077003Bprincipale_900Wx900H#k-zoom"
          />
          <Card.Body>
            <Card.Title>Velvet Touch Creamy Stick Blush</Card.Title>
            <Card.Text>$ 14.00</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://images.kikocosmetics.com/sys-master/images/hef/h2e/10957493043230/KM000000077003Bprincipale_900Wx900H#k-zoom"
          />
          <Card.Body>
            <Card.Title>Velvet Touch Creamy Stick Blush</Card.Title>
            <Card.Text>$ 14.00</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
    </Swiper>
  );
};
