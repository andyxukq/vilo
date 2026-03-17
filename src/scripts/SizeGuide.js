import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

class SizeGuide extends HTMLElement {
  constructor() {
    super()
    this.modalTemplate = this.querySelector('.js-modal-content-template')
    this.cardModal = this.querySelector('card-modal')
    this.modalOpenBtn = this.querySelector(".js-size-guide-modal-open")
    this._handleModalOpen = this._handleModalOpen.bind(this)
  }

  connectedCallback() {
    if (!this.modalTemplate || !this.cardModal) return;
    this.cardModal.innerHTML = '';
    this.cardModal.appendChild(document.importNode(this.modalTemplate.content, true));
    if (this.modalOpenBtn) {
      this.modalOpenBtn.addEventListener('click', this._handleModalOpen);
    }
    this._initSlider()
  }

  disconnectedCallback() {
    if (this.modalOpenBtn) {
      this.modalOpenBtn.removeEventListener('click', this._handleModalOpen);
    }
    if (this.swiperInstance) {
      this.swiperInstance.destroy();
    }
  }

  _handleModalOpen() {
    this.cardModal.open();
    if (this.swiperInstance) {
      setTimeout(() => {
        this.swiperInstance.update();
      }, 100);
    }
  }

  _initSlider() {
    const sliderEl = this.querySelector(".size-guide-slider");
    const nextBtn = this.querySelector(".size-guide-swiper-button-next");
    const prevBtn = this.querySelector(".size-guide-swiper-button-prev");
    const paginationEl = this.querySelector(".size-guide-swiper-pagination");
    if (!sliderEl) return;
    this.swiperInstance = new Swiper(sliderEl, {
      modules: [Navigation, Pagination],
      slidesPerView: 1.2,
      spaceBetween: 20,
      grabCursor: true,
      observer: true,
      observeParents: true,
      watchOverflow: false,
      centerInsufficientSlides: false,
      pagination: {
        el: paginationEl,
        type: 'fraction',
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      breakpoints: {
        768: {
          slidesPerView: 1.4,
          slidesPerGroup: 1,
        },
      }
    });
  }

}

customElements.define('size-guide', SizeGuide)