import Swiper from 'swiper';
import { FreeMode, Thumbs, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

class ProductMedia extends HTMLElement {
  connectedCallback() {
    this.initSwipers()

    this._variantListener = async (event) => {
      const variantName = event.detail.variant;
      if (variantName) {
        await this.updateImages(variantName);
      }
    };

    window.addEventListener('variant:changed', this._variantListener);

    import('./media-utils.js').then(({ preloadAllVariants }) => {
      preloadAllVariants();
    });
  }

  disconnectedCallback() {
    window.removeEventListener('variant:changed', this._variantListener);
    this.mainSwiper?.destroy()
    this.thumbSwiper?.destroy()
  }

  initSwipers() {
    const nextBtn = this.querySelector('.product-main-swiper-button-next');
    const prevBtn = this.querySelector('.product-main-swiper-button-prev');

    const productThumbSwiperInstance = new Swiper(
      this.querySelector('.product-thumb-swiper'),
      {
        modules: [FreeMode, Thumbs],
        slidesPerView: 6,
        spaceBetween: 8,
        freeMode: true,
        watchSlidesProgress: true,
      },
    );

    const productMainSwiperInstance = new Swiper(
      this.querySelector('.product-main-swiper'),
      {
        modules: [Thumbs, EffectFade, Navigation],
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        slidesPerView: 1,
        grabCursor: true,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        thumbs: {
          swiper: productThumbSwiperInstance,
        },
      },
    );

    this.mainSwiper = productMainSwiperInstance;
    this.thumbSwiper = productThumbSwiperInstance;
  }

  async updateImages(variantName) {
    const { IMAGES_URLS } = await import('./media-utils.js');
    const newImages = IMAGES_URLS[variantName];
    if (!newImages) return;

    const mainImages = this.querySelectorAll('.product-main-swiper img');
    const thumbImages = this.querySelectorAll('.product-thumb-swiper img');

    newImages.forEach((url, index) => {
      if (mainImages[index]) mainImages[index].src = url;
      if (thumbImages[index]) thumbImages[index].src = url;
    });
  }
}

customElements.define('product-media', ProductMedia);
