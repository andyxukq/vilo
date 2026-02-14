export const IMAGES_URLS = {
  "Glass Jade": [
    "/images/product-page/PV01/glass-jade-1.webp",
    "/images/product-page/PV01/glass-jade-2.webp",
    "/images/product-page/PV01/glass-jade-3.webp",
    "/images/product-page/PV01/glass-jade-4.webp",
    "/images/product-page/PV01/glass-jade-5.webp",
    "/images/product-page/PV01/glass-jade-6.webp",
  ],
  "Golden Twist": [
    "/images/product-page/PV02/golden-twist-1.webp",
    "/images/product-page/PV02/golden-twist-2.webp",
    "/images/product-page/PV02/golden-twist-3.webp",
    "/images/product-page/PV02/golden-twist-4.webp",
    "/images/product-page/PV02/golden-twist-5.webp",
    "/images/product-page/PV02/golden-twist-6.webp",
  ],
  "Silver Twist": [
    "/images/product-page/PV03/silver-twist-1.webp",
    "/images/product-page/PV03/silver-twist-2.webp",
    "/images/product-page/PV03/silver-twist-3.webp",
    "/images/product-page/PV03/silver-twist-4.webp",
    "/images/product-page/PV03/silver-twist-5.webp",
    "/images/product-page/PV03/silver-twist-6.webp",
  ],
};

export const preloadAllVariants = () => {
  const task = () => {
    Object.values(IMAGES_URLS).slice(1).forEach(urls => {
      urls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(task);
  } else {
    window.addEventListener('load', () => {
      setTimeout(task, 2000);
    });
  }
};