class ProductMedia extends HTMLElement {
  constructor() {
    super();
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  connectedCallback() {
    this.mainImage = this.querySelector('.product-mobile-image');
    this.stage = this.querySelector('.mobile-image-stage');
    this.holders = this.querySelectorAll('.product-media-image-holder');
    this.holders.forEach(holder => {
      holder.addEventListener('click', this.handleImageClick);
    });
  }

  handleImageClick(event) {
    const holder = event.currentTarget;
    const img = holder.querySelector('img');

    if (!img || !this.stage) return;

    const src = img.getAttribute('src');

    this.stage.style.backgroundImage = `url('${src}')`;

    if (!this.stage.classList.contains('active')) {
      setTimeout(() => this.stage.classList.add('active'), 300)
      this.mainImage.classList.add('not-visible');
    }

    this.holders.forEach(h => h.classList.remove('selected'));
    holder.classList.add('selected');
  }

  disconnectedCallback() {
    this.holders.forEach(holder => {
      holder.removeEventListener('click', this.handleImageClick);
    });
  }
}

customElements.define('product-media', ProductMedia);