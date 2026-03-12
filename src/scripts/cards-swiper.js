import Swiper from 'swiper';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const initCardsScroll = () => {
  const el = document.querySelector('.cards-swiper');
  const cardModal = document.querySelector('card-modal');

  if (!el) return;
  new Swiper(el, {
    modules: [FreeMode, Navigation, Pagination],
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
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
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
    },
    on: {
      click: (s) => {
        if (!cardModal || !s.clickedSlide) return;
        const slide = s.clickedSlide;
        cardModal.open({
          name: slide.dataset.name,
          role: slide.dataset.role,
          description: slide.dataset.description,
          imageUrl: slide.dataset.imageUrl,
        });
      }
    }
  });
};

initCardsScroll();