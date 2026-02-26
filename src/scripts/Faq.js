class FaqTabs extends HTMLElement {
  #abortController;
  connectedCallback() {
      this.#abortController = new AbortController();
      const { signal } = this.#abortController;
      this.buttons = this.querySelectorAll('.tab-btn');
      this.contents = this.querySelectorAll('.tab-content');

      this.buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => this.switchTab(index), { signal });
      });
  }

  disconnectedCallback() {
    this.#abortController.abort();
  }

  switchTab(index) {
    this.buttons.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle('active', isActive);

      if (this.contents[i]) {
        this.contents[i].classList.toggle('active', isActive);
      }
    });
  }
}

customElements.define('faq-tabs', FaqTabs);