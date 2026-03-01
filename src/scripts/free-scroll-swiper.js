import Swiper from 'swiper';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';


const initFreeScroll = () => {
  const el = document.querySelector('.free-scroll-swiper');
  if (!el) return;

  const parent = el.closest('.free-scroll-section');
  const nextBtn = parent.querySelector('.free-scroll-swiper-button-next');
  const prevBtn = parent.querySelector('.free-scroll-swiper-button-prev');

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
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.25,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 'auto',
        spaceBetween: 30,
        slidesOffsetBefore: 15,
        slidesOffsetAfter: 15,
      },
      1024: {
        slidesOffsetBefore: 80,
        slidesOffsetAfter: 80,
      }
    }
  });
};

initFreeScroll();