/**
 * Click on elements with data-fb-event fires that event to Facebook Pixel.
 * Example: <button data-fb-event="SubmitApplication">Sign up</button>
 */

const ATTR = 'data-fb-event';

function handleTrackClick(e) {
  const target = e.target.closest(`[${ATTR}]`);
  if (!target) return;

  const eventName = target.getAttribute(ATTR)?.trim();
  if (!eventName) return;

  if (typeof window.fbq === 'function') {
    try {
      window.fbq('track', eventName);
      console.log('[EventTracking] fbq track:', eventName);
    } catch (err) {
      console.warn('[EventTracking] fbq track failed:', err);
    }
  }
}

function init() {
  document.addEventListener('click', handleTrackClick, true);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
