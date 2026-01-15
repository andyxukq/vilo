class ProductForm extends HTMLElement {
  constructor() {
    super();
    this.CONFIG = {
      domain: '0v8paw-jk.myshopify.com',
      token: 'e76b0b1745c7f891fc4cf5fd5a412be1',
      handle: 'vilo-smart-ring'
    };
    this.shopifyClient = null;
    this.buyButtonUI = null;
    this.currentComponent = null;
    this.isRendering = false;

    this.updateVariant = this.updateVariant.bind(this);
    this.handleProxyClick = this.handleProxyClick.bind(this);
  }

  connectedCallback() {
    this.customBuyBtn = this.querySelector('.preorder-button');
    this.sdkNode = this.querySelector('.shopify-buy-button-container');

    if (globalThis.ShopifyBuy?.UI) {
      this.initShopify();
    } else {
      globalThis.addEventListener('shopify-sdk-loaded', () => this.initShopify(), { once: true });
    }

    this.customBuyBtn?.addEventListener('click', this.handleProxyClick);
  }

  disconnectedCallback() {
    this.customBuyBtn?.removeEventListener('click', this.handleProxyClick);

    const fieldsets = this.querySelectorAll('fieldset');
    fieldsets.forEach(fs => fs.removeEventListener('change', this.updateVariant));

    if (this.currentComponent?.destroy) {
      this.currentComponent.destroy();
      this.currentComponent = null;
    }
  }

  async initShopify() {
    this.shopifyClient = ShopifyBuy.buildClient({
      domain: this.CONFIG.domain,
      storefrontAccessToken: this.CONFIG.token,
    });

    this.buyButtonUI = await ShopifyBuy.UI.onReady(this.shopifyClient);

    this.shopifyClient.product.fetchByHandle(this.CONFIG.handle).then((product) => {
      this.productData = product;

      const fieldsets = this.querySelectorAll('fieldset');
      fieldsets.forEach(fs => fs.addEventListener('change', this.updateVariant));

      this.updateVariant();
    });
  }

  updateVariant() {
    if (!this.productData) return;

    const fieldsets = this.querySelectorAll('fieldset');
    const selectedOptions = Array.from(fieldsets).map((fs) => {
      const checked = fs.querySelector('input:checked');
      return checked ? checked.value : null;
    });

    const matchedVariant = this.productData.variants.find((variant) => {
      return selectedOptions.every((val) =>
        variant.selectedOptions.some((opt) => opt.value === val)
      );
    });

    if (matchedVariant) {
      const isAvailable = matchedVariant.available;
      this.toggleUIState(isAvailable);

      if (isAvailable) {
        this.renderShopifyButton(
          this.productData.id.split('/').pop(),
          matchedVariant.id.split('/').pop()
        );
      } else if (this.currentComponent) {
        this.currentComponent.destroy();
      }
    }
  }

  async renderShopifyButton(productId, variantId) {
    if (!this.sdkNode || !this.buyButtonUI || this.isRendering) return;

    this.isRendering = true;
    this.toggleUIState(false);

    try {
      if (this.currentComponent?.destroy) {
        await this.currentComponent.destroy();
      }
      this.sdkNode.innerHTML = '';

      this.currentComponent = await this.buyButtonUI.createComponent('product', {
        id: productId,
        variantId: variantId,
        node: this.sdkNode,
        options: {
          "product": {
            "buttonDestination": "checkout",
            "contents": { "img": false, "title": false, "price": false, "options": false }
          }
        }
      });
    } catch (err) {
      console.error("Render Error:", err);
    } finally {
      this.isRendering = false;
      this.toggleUIState(true);
    }
  }

  toggleUIState(isActive) {
    if (!this.customBuyBtn) return;
    this.customBuyBtn.disabled = !isActive;
    this.customBuyBtn.style.opacity = isActive ? '1' : '0.5';
    this.customBuyBtn.style.pointerEvents = isActive ? 'auto' : 'none';
  }

  handleProxyClick(e) {
    e.preventDefault();
    const iframe = this.sdkNode?.querySelector('iframe');
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      const shopifyBtn = innerDoc.querySelector('.shopify-buy__btn');
      if (shopifyBtn) {
        shopifyBtn.click();
      }
    }
  }
}

customElements.define('product-form', ProductForm);