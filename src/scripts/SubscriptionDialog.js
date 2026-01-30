class SubscriptionDialog extends HTMLElement {
  constructor() {
    super();
    this._handleNextStepClick = this._handleNextStepClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  connectedCallback() {
    this.nextStepButtons = this.querySelectorAll('.next-step');
    this.nextStepButtons.forEach(btn => {
      btn.addEventListener('click', this._handleNextStepClick)
    });

    this.emailInput = this.querySelector('.email-input-field');
    this.emailInput.addEventListener('input', this._handleInputChange);
    this.emailForm = this.querySelector('.email-subscribe-form');
    this.emailForm.addEventListener('submit', this._handleFormSubmit);

  }

  disconnectedCallback() {
    this.nextStepButtons.forEach(btn => {
      btn.removeEventListener('click', this._handleNextStepClick);
    });
    this.emailForm.removeEventListener('submit', this._handleFormSubmit);
    this.emailInput.removeEventListener('input', this._handleInputChange);
  }

  _handleInputChange() {
    this._toggleError(false);
  }

  _handleNextStepClick(e) {
    e.preventDefault();
    this._switchStepVisibility(e.currentTarget.dataset.nextStep);
  }

  _inputValidation() {
    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailInput.value))
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    const isValidEmail = this._inputValidation();

    if (isValidEmail) {
      const id = this.closest('modal-dialog')?.getAttribute('id');
      this._successfulSubmit();
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent(`dialog:close:${id}`))
      }, 2000);
    } else {
      this._toggleError(true);
    }
  }

  _successfulSubmit() {
    const button = this.emailForm.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Subscribed!';
  }

  _toggleError(showError) {
    this.emailInput.classList.toggle('error', showError);
  }

  _switchStepVisibility(step) {
    this.dataset.activeStep = step;
  }

  reset() {
    setTimeout(() => {
      this._resetForm();
    }, 1000);
  }

  _resetForm() {
    this.dataset.activeStep = 1;
    this.emailForm?.reset();
    this._toggleError(false);
  }
}

customElements.define('subscription-dialog', SubscriptionDialog);