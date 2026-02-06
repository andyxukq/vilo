class DesktopMenu extends HTMLElement {
  constructor() {
    super()
    this.activeZone = []
    this.menuLinks = []
    this.menuRows = []
    this.closeTimer = null
    this.IN_ZONE_DELAY = 300
    this.CLOSE_DELAY = 50

    this._initiateClose = this._initiateClose.bind(this)
    this._forceClose = this._forceClose.bind(this)
  }

  connectedCallback() {
    const header = document.querySelector('header')
    this.menuLinks = Array.from(header.querySelectorAll('[data-dropdown-id]'))
    this.menuRows = Array.from(this.querySelectorAll('[data-menu-id]'))

    this.activeZone = [
      document.querySelector('announcement-bar'),
      header.querySelector('.header-content-wrapper'),
      this
    ].filter(el => el !== null);

    const simpleLinks = header.querySelectorAll('.nav-links a:not([data-dropdown-id])')

    this.menuLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        clearTimeout(this.closeTimer);
        const targetId = link.dataset.dropdownId;
        this._toggleDesktopMenuShow(true)
        this._setActiveMenuLink(link)
        this.menuRows.forEach((row) => {
          row.classList.toggle('is-active', row.dataset.menuId === targetId);
        });
      });
    });

    this.activeZone.forEach((element) => {
      element.addEventListener('mouseleave', this._initiateClose);
      element.addEventListener('mouseenter', () => clearTimeout(this.closeTimer));
    });

    if (simpleLinks.length > 0) {
      simpleLinks.forEach((link) => link.addEventListener('mouseenter', this._forceClose))
    }
  }

  _initiateClose() {
    this.closeTimer = setTimeout(() => {
      const stillInZone = this.activeZone.some((el) => el.matches(':hover'))
      if (!stillInZone) {
        this._toggleDesktopMenuShow(false)
        this._setActiveMenuLink(null)
        this._removeActiveClass()
      }
    }, this.CLOSE_DELAY);
  }

  _forceClose() {
    clearTimeout(this.closeTimer);
    this._toggleDesktopMenuShow(false);
    this._setActiveMenuLink(null);
    this._removeActiveClass()
  }

  _removeActiveClass() {
    setTimeout(() => {
      if(!document.body.classList.contains('dm-open')) {
        this.menuRows.forEach((row) => row.classList.remove('is-active'))
      }
    }, this.IN_ZONE_DELAY)
  }

  _setActiveMenuLink(activeLink) {
    this.menuLinks.forEach((link) => {
      link.classList.toggle('is-active', link === activeLink)
    });
  }

  _toggleDesktopMenuShow(show) {
    document.body.classList.toggle('dm-open', show);
  }

}

customElements.define("desktop-menu", DesktopMenu);