const productHandle = 'vilo-smart-ring';
const domain = '0v8paw-jk.myshopify.com';
const storefrontAccessToken = 'e76b0b1745c7f891fc4cf5fd5a412be1';
const shopifyBuyButtonHolderClass = '.shopify-buy-button-container';

(function () {
  const shopifyBuyButtonHolder = document.querySelector(shopifyBuyButtonHolderClass);

  if (!shopifyBuyButtonHolder) {
    return;
  }

  const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  let shopifyClient;
  let buyButtonUI;
  let currentComponent;

  function ShopifyBuyInit() {
    shopifyClient = ShopifyBuy.buildClient({
      domain,
      storefrontAccessToken,
    });

    ShopifyBuy.UI.onReady(shopifyClient).then((ui) => {
      buyButtonUI = ui;
      initVariantListeners(productHandle);
    });
  }

  function initVariantListeners(handle) {
    shopifyClient.product.fetchByHandle(handle).then((product) => {
      const optionsLists = document.querySelectorAll('.product-variant-picker fieldset');

      const updateVariant = () => {
        const selectedOptions = Array.from(optionsLists).map((fieldset) => {
          const checked = fieldset.querySelector('input:checked');
          return checked ? checked.value : null;
        });

        const matchedVariant = product.variants.find(variant => {
          return selectedOptions.every(val =>
            variant.selectedOptions.some(opt => opt.value === val)
          );
        });

        if (matchedVariant) {
          const cleanProductId = product.id.split('/').pop();
          const cleanVariantId = matchedVariant.id.split('/').pop();
          renderButton(cleanProductId, cleanVariantId);
        }
      };

      optionsLists.forEach(fs => fs.addEventListener('change', updateVariant));
      updateVariant();
    });
  }

  async function renderButton(productId, variantId) {
    const node = document.querySelector('#shopify-buy-button-1768341264812');
    if (!node || !buyButtonUI) return;

    // 1. Properly destroy old button
    if (currentComponent && typeof currentComponent.destroy === 'function') {
      await currentComponent.destroy();
    }

    const promiseInstance = buyButtonUI.createComponent('product', {
      id: productId,
      variantId: variantId,
      node: node,
      moneyFormat: '%24%7B%7Bamount%7D%7D',
      options: {
        "product": {
          "styles": {
            "product": {}
          },
          "buttonDestination": "checkout",
          "contents": { "img": false, "title": false, "price": false, "options": false },
          "text": { "button": "Buy now" }
        }
      }
    });

    if (promiseInstance && typeof promiseInstance.then === 'function') {
      promiseInstance.then(component => {
        currentComponent = component;
      }).catch(err => {
        console.error("Shopify internal create error:", err);
      });
    }
  }

  if (window.ShopifyBuy && window.ShopifyBuy.UI) {
    ShopifyBuyInit();
  } else {
    const script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
})();