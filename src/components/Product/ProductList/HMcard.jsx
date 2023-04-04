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
      spaceBetween={570}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <img
          className="HM_with"
          src="https://images.kikocosmetics.com/mediaObject/2022/info/makeup-services/Info_MakeupServices_HP_Carousel/webp-resolutions/res-720x600/Info_MakeupServices_HP_Carousel.webp"
          alt="photo"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="HM_with"
          src="https://images.kikocosmetics.com/mediaObject/2022/tutorial-how-to/video-tutorial/lips/Info_Editorial-VideoTutorial_Lips_TutorialHubPage-Banner/webp-resolutions/res-720x600/Info_Editorial-VideoTutorial_Lips_TutorialHubPage-Banner.webp"
          alt="photo1"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="HM_with"
          src="https://images.kikocosmetics.com/mediaObject/2022/launches/makeup-and-skincare-set/Launch_MakeupAndSkincareSet_HP_Carousel/webp-resolutions/res-720x600/Launch_MakeupAndSkincareSet_HP_Carousel.webp"
          alt="photo3"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="HM_with"
          src="https://images.kikocosmetics.com/mediaObject/2021/Info/foundation-finder/version-01/Info_FoundationFinder_Carousel/webp-resolutions/res-720x600/Info_FoundationFinder_Carousel.webp"
          alt="photo4"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="HM_with"
          src="https://images.kikocosmetics.com/mediaObject/2021/Info/foundation-finder/version-01/Info_FoundationFinder_Carousel/webp-resolutions/res-720x600/Info_FoundationFinder_Carousel.webp"
          alt="photo4"
        />
      </SwiperSlide>
    </Swiper>
  );
};
