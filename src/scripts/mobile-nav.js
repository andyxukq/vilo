class MobileMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
  }

  connectedCallback() {
    this.render();
    const btn = document.querySelector(".mobile-menu-btn");
    if (btn) {
      btn.addEventListener("click", () => this.toggleMenu());
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.updateStyles();
  }

  updateStyles() {
    const drawer = this.shadowRoot.querySelector(".drawer");
    const overlay = this.shadowRoot.querySelector(".overlay");
    const btn = this.shadowRoot.querySelector(".menu-btn");

    if (this.isOpen) {
      drawer.classList.add("open");
      overlay.classList.add("active");
      btn.classList.add("active");
    } else {
      drawer.classList.remove("open");
      overlay.classList.remove("active");
      btn.classList.remove("active");
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
                <style>
                    .drawer {
                        position: fixed;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        max-width: 37.5rem;
                        background: var(--white);
                        color: var(--primary-color);
                        transition: 0.3s;
                        z-index: 100;
                        padding-top: 2rem;
                        box-shadow: -0.2rem 0 .5rem rgba(var(--black),0.5);
                        background: var(--background-color);
                    }
                    .drawer.open {
                      left: 0;
                    }
                    .drawer-header {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    }
                    .close-btn {
                      background: transparent;
                      border: none;
                      font-size: 2rem;
                      cursor: pointer;
                      line-height: 1;
                      padding: .5rem 1rem;
                    }

                    /* Dark Overlay */
                    .overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(var(--black),0.5);
                        visibility: hidden;
                        opacity: 0;
                        transition: 0.3s;
                        z-index: 90;
                    }
                    .overlay.active {
                      visibility: visible;
                      opacity: 1;
                    }
                    h2 { padding: 0 15px; }
                </style>

                <div class="overlay"></div>

                <div class="drawer">
                    <div class="drawer-header">
                      <h2>${this.getAttribute('title') || 'Navigation'}</h2>
                      <button class="close-btn" role="button" aria-label="Close menu">&times;</button>
                    </div>
                    <slot></slot> </div>
                `;
    this.shadowRoot.querySelector('.close-btn').onclick = () => this.toggleMenu();
    this.shadowRoot.querySelector(".overlay").onclick = () => this.toggleMenu();
  }
}

customElements.define("mobile-menu", MobileMenu)
