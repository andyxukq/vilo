const headerNode = document.querySelector('header');
const bodyNode = document.body;

if (headerNode && bodyNode) {
  let lastScrollY = window.scrollY;
  let scrollRafId = 0;

  const HIDE_AFTER_Y = 150;
  const reducedMotion =
    globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;

  const flushScroll = () => {
    scrollRafId = 0;

    if (!headerNode.isConnected || bodyNode.classList.contains('dm-open')) {
      return;
    }

    const y = window.scrollY;
    const delta = y - lastScrollY;
    lastScrollY = y;

    if (delta === 0) return;

    headerNode.classList.toggle('header--hidden', delta > 0 && y > HIDE_AFTER_Y);
  };

  const onScroll = () => {
    if (scrollRafId !== 0) return;
    scrollRafId = globalThis.requestAnimationFrame(flushScroll);
  };

  headerNode.addEventListener('focusin', () => {
    headerNode.classList.remove('header--hidden');
  });

  if (!reducedMotion) {
    globalThis.addEventListener('scroll', onScroll, { passive: true });
  }
}
