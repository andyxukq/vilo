import Swiper from 'swiper';
import { FreeMode, Thumbs, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

class ProductMedia extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.initSwipers()
  }

  disconnectedCallback() {
  }

  initSwipers() {
   const productThumbSwiperInstance = new Swiper(document.querySelector('.product-thumb-swiper'), {
    modules: [FreeMode, Thumbs],
     slidesPerView: 6,
    spaceBetween: 8,
    freeMode: true,
    watchSlidesProgress: true,
  });

  const productMainSwiperInstance = new Swiper(document.querySelector('.product-main-swiper'), {
    modules: [Thumbs, EffectFade],
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    grabCursor: true,
    thumbs: {
      swiper: productThumbSwiperInstance,
    },
  });

  this.mainSwiper = productMainSwiperInstance;
  this.thumbSwiper = productThumbSwiperInstance;
  }
}

customElements.define('product-media', ProductMedia);