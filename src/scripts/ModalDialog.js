import { setCookie, getCookie } from "./utils";

class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();

    this._onOpenTrigger = () => this._handleOpen();
    this._onNativeClose = () => this._handleClose();
    this.modalClosedCookieName = '';
  }

  connectedCallback() {
    const id = this.getAttribute('id');
    this.modalClosedCookieName = id ? `modal_dialog_${id}_closed` : 'modal_dialog_generic_closed';
    this.dialog = this.shadowRoot.querySelector('[data-element="main-dialog"]');
    this.autoOpenTime = this.dataset.autoOpenDelay;
    if (this.autoOpenTime && !getCookie(this.modalClosedCookieName)) {
      this._autoOpen(this.autoOpenTime);
    }
    if (id) {
      window.addEventListener(`dialog:open:${id}`, () => this._handleOpen());
      window.addEventListener(`dialog:close:${id}`, () => this._handleClose());
    }

    this.dialog.addEventListener('click', this._onComponentClick);
    this.dialog.addEventListener('close', this._onNativeClose);
  }

  disconnectedCallback() {
    const id = this.getAttribute('id');
    if (id) {
      window.removeEventListener(`dialog:open:${id}`, this._onOpenTrigger);
      window.removeEventListener(`dialog:close:${id}`, this._handleClose);
    }
    this.dialog.removeEventListener('close', this._onNativeClose);
    this.dialog.removeEventListener('click', this._onComponentClick);
  }

  _autoOpen(delay) {
    setTimeout(() => {
      this._handleOpen();
    }, Number.parseInt(delay, 10) * 1000);
  }

  _onComponentClick = (e) => {
    const path = e.composedPath();
    const isCloseBtn = path.find(el => el.classList?.contains('js-close-modal-dialog'));
    const isBackdrop = e.target === this.dialog;
    if (isCloseBtn || isBackdrop) {
      e.preventDefault();
      this._handleClose();
    }
  };

  _handleClose() {
    if (this.dialog.open) {
      this.dialog.close();
      document.body.classList.remove('modal-open');
      setCookie(this.modalClosedCookieName, 'true', 30);
      const subscriptionDialog = this.querySelector('subscription-dialog');
      if (subscriptionDialog) subscriptionDialog.reset();
    }

    if (this._opener) {
      this._opener.focus();
    }
  }

  _handleOpen() {
    if (!this.dialog.open) {
      this._opener = document.activeElement;
      document.body.classList.add('modal-open');
      this.dialog.showModal();
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>

        dialog {
          opacity: 0;
          width: 100%;
          max-width: 61rem;
          border: none;
          padding: 0;
          border-radius: var(--border-radius-18) var(--border-radius-18) 0 0;
          margin: auto auto 0 auto;
          inset: unset;
          inset-block-end: 0;
          transition:
            opacity 0.3s ease-out,
            display 0.3s ease-out allow-discrete;
        }

        dialog::backdrop {
          background: rgba(0, 0, 0, 0);
          transition:
            background 0.3s ease-out,
            display 0.3s ease-out allow-discrete;
        }

        dialog[open] {
          opacity: 1;
        }

        dialog[open]::backdrop {
          background: rgba(0, 0, 0, 0.1);
        }

        dialog.is-closing {
          opacity: 0;
        }

        dialog.is-closing::backdrop {
          background: rgba(0, 0, 0, 0);
        }

        @starting-style {
          dialog[open] {
            opacity: 0;
          }
          dialog[open]::backdrop {
            background: rgba(0, 0, 0, 0);
          }
        }

        @media (min-width: 768px) {
          dialog {
            margin: auto;
            border-radius: var(--border-radius-30);
            inset: 0;
            width: calc(100% - 2rem);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          dialog, dialog::backdrop {
            transition: none;
          }
        }
      </style>

      <dialog data-element="main-dialog">
          <slot></slot>
      </dialog>
    `;
  }
}

customElements.define('modal-dialog', ModalDialog);