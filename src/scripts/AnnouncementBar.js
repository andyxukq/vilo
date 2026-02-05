class AnnouncementBar extends HTMLElement {
  connectedCallback() {
    this.observer = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle('header-is-sticky', !entry.isIntersecting);
    }, {
      threshold: 0
    });

    this.observer.observe(this);
  }

  disconnectedCallback() {
    this.observer.disconnect();
    document.body.classList.add('header-is-sticky');
  }
}

customElements.define('announcement-bar', AnnouncementBar);