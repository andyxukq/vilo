class ProductForm extends HTMLElement {
  constructor() {
    super();
    this.CONFIG = {
      domain: '0v8paw-jk.myshopify.com',
      token: 'e76b0b1745c7f891fc4cf5fd5a412be1',
      handle: 'vilo-smart-ring',
      utmSource: 'vilo-site',
      utmMedium: 'preorder-button',
      utmCampaign: 'vilo-launch-2026'
    };
    this.currentVariantId = null;
    this.updateVariant = this.updateVariant.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  connectedCallback() {
    this.customBuyBtn = this.querySelector('.preorder-button');
    this.toggleUIState(false);
    if (globalThis.ShopifyBuy?.UI) {
      this.initShopify();
    } else {
      globalThis.addEventListener('shopify-sdk-loaded', () => this.initShopify(), { once: true });
    }
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  addEventListeners() {
    this.customBuyBtn?.addEventListener('click', this.handleCheckout);
    const fieldsets = this.querySelectorAll('fieldset');
    fieldsets.forEach(fs => fs.addEventListener('change', this.updateVariant));
  }

  removeEventListeners() {
    const fieldsets = this.querySelectorAll('fieldset');
    fieldsets.forEach(fs => fs.removeEventListener('change', this.updateVariant));
    this.customBuyBtn?.removeEventListener('click', this.handleCheckout);
  }

  async initShopify() {
    try {
      const shopifyClient = ShopifyBuy.buildClient({
        domain: this.CONFIG.domain,
        storefrontAccessToken: this.CONFIG.token,
      });

      this.productData = await shopifyClient.product.fetchByHandle(this.CONFIG.handle);
      this.addEventListeners();
      this.updateVariant();
    } catch (error) {
      console.error("Shopify Initialization Failed:", error);
    }
  }

  updateVariant() {
    if (!this.productData) return;

    const fieldsets = this.querySelectorAll('fieldset');
    const selectedOptions = Array.from(fieldsets).map(fs => fs.querySelector('input:checked')?.value);

    const matchedVariant = this.productData.variants.find(variant =>
      selectedOptions.every(val => variant.selectedOptions.some(opt => opt.value === val))
    );

    if (matchedVariant) {
      this.currentVariantId = matchedVariant.id.split('/').pop();
      this.toggleUIState(matchedVariant.available);
    }
  }

  toggleUIState(isActive) {
    if (!this.customBuyBtn) return;
    this.customBuyBtn.disabled = !isActive;
    this.customBuyBtn.style.opacity = isActive ? '1' : '0.5';
    this.customBuyBtn.style.pointerEvents = isActive ? 'auto' : 'none';
  }

  handleCheckout(e) {
    e.preventDefault();
    if (this.currentVariantId) {
      this.customBuyBtn.disabled = true;
      const utms = `?utm_source=${this.CONFIG.utmSource}&utm_medium=${this.CONFIG.utmMedium}&utm_campaign=${this.CONFIG.utmCampaign}`;
      globalThis.location.href = `https://${this.CONFIG.domain}/cart/${this.currentVariantId}:1${utms}`;
    }
  }
}

customElements.define('product-form', ProductForm);