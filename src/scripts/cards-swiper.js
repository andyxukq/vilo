import Swiper from 'swiper';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';


const initCardsScroll = () => {
  const el = document.querySelector('.cards-swiper');
  if (!el) return;
  new Swiper(el, {
    modules: [FreeMode, Navigation],
    slidesPerView: 'auto',
    spaceBetween: 16,
    freeMode: {
      enabled: true,
      sticky: false,
      momentumBounce: false,
    },
    grabCursor: true,
    watchSlidesProgress: true,
    slidesOffsetBefore: 15,
    slidesOffsetAfter: 15,
    breakpoints: {
      320: {
        slidesPerView: 1.25,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 3.25,
        spaceBetween: 30,
        slidesOffsetBefore: 15,
        slidesOffsetAfter: 15,
      },
      1024: {
        slidesPerView: 3.1,
        spaceBetween: 30,
        slidesOffsetBefore: 80,
        slidesOffsetAfter: 80,
      }
    }
  });
};

initCardsScroll();