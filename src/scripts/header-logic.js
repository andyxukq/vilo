const headerNode = document.querySelector('header')
const bodyNode = document.body
let lastScrollY = window.scrollY
let ticking = false

const updateHeader = () => {

  if (bodyNode.classList.contains('dm-open')) {
    ticking = false;
    return;
  }
  const currentScrollY = window.scrollY
  const threshold = 30

  if (Math.abs(currentScrollY - lastScrollY) > threshold) {
    headerNode.classList.toggle('header--hidden', currentScrollY > lastScrollY && currentScrollY > 100)
    lastScrollY = currentScrollY
  }

  ticking = false
}

if (headerNode) {
  headerNode.addEventListener('focusin', () => {
    headerNode.classList.remove('header--hidden');
  });
  globalThis.addEventListener('scroll', () => {
    if (!ticking) {
      globalThis.requestAnimationFrame(updateHeader)
      ticking = true
    }
  })
}
