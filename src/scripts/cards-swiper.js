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
      addIcons: false,
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
        const slide = s.clickedSlide;
        if (!cardModal || !slide) return;

        const template = slide.querySelector('.js-modal-content-template');
        if (!template) return;

        cardModal.innerHTML = '';
        cardModal.appendChild(document.importNode(template.content, true));

        cardModal.open();
      }
    }
  });
};

initCardsScroll();