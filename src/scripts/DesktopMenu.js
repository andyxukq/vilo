class DesktopMenu extends HTMLElement {
  constructor() {
    super();
    this.activeZone = [];
    this.closeTimer = null;
  }

  connectedCallback() {
    const header = document.querySelector('header')
    const menuLinks = header.querySelectorAll('[data-dropdown-id]');
    const menuRows = this.querySelectorAll('[data-menu-id]');

    this.activeZone = [
      document.querySelector('announcement-bar'),
      header.querySelector('.header-content-wrapper'),
      this
    ].filter(el => el !== null);

    menuLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        clearTimeout(this.closeTimer);
        const targetId = link.dataset.dropdownId;
        this.toggleDesktopMenuShow(true)
        menuRows.forEach(row => {
          row.classList.toggle('is-active', row.dataset.menuId === targetId);
        });
      });
    });

    this.activeZone.forEach(element => {
      element.addEventListener('mouseleave', () => this.initiateClose(menuRows));
      element.addEventListener('mouseenter', () => clearTimeout(this.closeTimer));
    });
  }

  initiateClose(menuRows) {
    this.closeTimer = setTimeout(() => {
      const stillInZone = this.activeZone.some(el => el.matches(':hover'));

      if (!stillInZone) {
        this.toggleDesktopMenuShow(false)
        setTimeout(() => {
           if(!document.body.classList.contains('dm-open')) {
             menuRows.forEach(row => row.classList.remove('is-active'));
           }
        }, 300);
      }
    }, 50);
  }

  toggleDesktopMenuShow(show) {
    document.body.classList.toggle('dm-open', show);
  }

}

customElements.define("desktop-menu", DesktopMenu);