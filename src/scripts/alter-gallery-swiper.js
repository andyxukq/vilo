import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

let swiperAlterGalleryInstance = null;

function initAlterSwiper() {
  if (!swiperAlterGalleryInstance) {
    swiperAlterGalleryInstance = new Swiper('.alter-gallery-slider', {
      modules: [Pagination, Navigation],
      slidesPerView: 1.2,
      spaceBetween: 16,
      centeredSlides: false,
      breakpoints: {
        768: {
          slidesPerView: 'auto',
          spaceBetween: 20,
        }
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  else if (swiperAlterGalleryInstance) {
    swiperAlterGalleryInstance.destroy(true, true);
    swiperAlterGalleryInstance = null;
  }
}

window.addEventListener('DOMContentLoaded', initAlterSwiper);
