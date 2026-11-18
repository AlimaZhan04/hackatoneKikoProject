import { Swiper,SwiperSlide } from 'swiper/react';
import { Navigation,Pagination,Scrollbar,A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';import 'swiper/css/navigation';import 'swiper/css/pagination';import 'swiper/css/scrollbar';
import './HMcard.css';
const slides=[['/images/beauty-lips.jpg','Find your lip colour','/best?q=lip'],['/images/beauty-eyes.jpg','Make your eyes stand out','/best?type=decorative'],['/images/hero-gifts.webp','Beauty gifts and accessories','/accessories'],['/images/hero-beauty.jpg','Find your perfect finish','/best'],['/images/beauty-care.jpg','Your daily skincare routine','/best?type=care']];
export default function HMcard(){return <Swiper className="news-carousel" modules={[Navigation,Pagination,Scrollbar,A11y]} spaceBetween={24} slidesPerView={1} breakpoints={{640:{slidesPerView:2},1024:{slidesPerView:3}}} navigation pagination={{clickable:true}} scrollbar={{draggable:true}}>{slides.map(([image,title,link])=><SwiperSlide key={title}><Link to={link}><img className="HM_with" src={image} alt={title}/><p>{title}</p></Link></SwiperSlide>)}</Swiper>;}
