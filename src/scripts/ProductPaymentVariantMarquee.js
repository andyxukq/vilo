class ProductPaymentVariantMarquee extends HTMLElement {
  constructor() {
    super();
    this.isScrolling = false;
    this.handlePlanChange = this.handlePlanChange.bind(this);
  }

  connectedCallback() {
    this.track = this.querySelector('.marquee-track');

    if (!this.track) return;

    globalThis.addEventListener('payment-plan:changed', this.handlePlanChange);

    this.observer = new ResizeObserver(() => this.calculateOverflow());
    this.observer.observe(this);

    this.calculateOverflow();
  }

  handlePlanChange(e) {
    if (e.detail?.plan) {
      this.updateVisibility(e.detail.plan);
    }
  }

  updateVisibility(activePlan) {
    this.querySelectorAll('.marquee-content').forEach(el => {
      el.classList.toggle('is-active', el.dataset.variant === activePlan);
    });
    this.calculateOverflow();
  }

  calculateOverflow() {
    requestAnimationFrame(() => {
      this.querySelectorAll('.is-clone').forEach(el => el.remove());
      this.classList.remove('is-overflowing');
      this.isScrolling = false;

      const activeContent = this.querySelector('.marquee-content.is-active');

      if (!activeContent) return;

      if (activeContent.scrollWidth > this.offsetWidth) {
        this.initMarquee(activeContent);
      }
    });
  }

  initMarquee(activeContent) {
    const clone = activeContent.cloneNode(true);
    clone.classList.add('is-clone');
    clone.setAttribute('aria-hidden', 'true');

    this.track.appendChild(clone);
    this.classList.add('is-overflowing');
    this.isScrolling = true;
  }

  disconnectedCallback() {
    globalThis.removeEventListener('payment-plan:changed', this.handlePlanChange);
    if (this.observer) this.observer.disconnect();
  }
}

customElements.define('product-payment-variant-marquee', ProductPaymentVariantMarquee);