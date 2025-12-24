import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

let swiperInstance = null;

function initSwiper() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile && !swiperInstance) {
    swiperInstance = new Swiper('.gallery-slider', {
      modules: [Pagination, Navigation],
      slidesPerView: 1.2,
      spaceBetween: 16,
      centeredSlides: false,
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

  else if (!isMobile && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

window.addEventListener('DOMContentLoaded', initSwiper);

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initSwiper, 150);
});