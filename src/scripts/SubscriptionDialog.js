class SubscriptionDialog extends HTMLElement {
  constructor() {
    super()
    this._handleNextStepClick = this._handleNextStepClick.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this.EMAIL_API = 'https://api.vesta-home.com/service/vilo-email-signup?list_id=YvyRty'
    this.abortController = null
  }

  connectedCallback() {
    this.abortController = new AbortController()
    const { signal } = this.abortController

    this.nextStepButtons = this.querySelectorAll('.next-step')
    this.nextStepButtons.forEach(btn => {
      btn.addEventListener('click', this._handleNextStepClick, { signal })
    })

    this.emailInput = this.querySelector('.email-input-field')
    this.emailInput?.addEventListener('input', this._handleInputChange, { signal })
    this.emailForm = this.querySelector('.email-subscribe-form')
    this.emailForm?.addEventListener('submit', this._handleFormSubmit, { signal })
  }

  disconnectedCallback() {
    this.abortController?.abort()
  }

  _handleInputChange() {
    this._toggleError(false)
  }

  _handleNextStepClick(e) {
    e.preventDefault()
    this._switchStepVisibility(e.currentTarget.dataset.nextStep)
  }

  _inputValidation() {
    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailInput.value))
  }

  async _handleFormSubmit(e) {
    e.preventDefault()
    if (!this._inputValidation()) {
      this._toggleError(true);
      return;
    }

    const button = this.emailForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    try {
      button.disabled = true;
      button.textContent = 'Sending...';

      const response = await fetch(this.EMAIL_API, {
        method: 'POST',
        body: JSON.stringify({ email: this.emailInput.value }),
        headers: { 'Content-Type': 'application/json' },
        signal: this.abortController.signal
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const id = this.closest('modal-dialog')?.getAttribute('id');
      this._successfulSubmit(button);

      setTimeout(() => {
        if (!this.abortController.signal.aborted) {
          window.dispatchEvent(new CustomEvent(`dialog:close:${id}`));
        }
      }, 2000);

    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error("Submit error:", err);
      button.disabled = false;
      button.textContent = originalText;
      this._toggleError(true);
    }
  }

  _successfulSubmit() {
    const button = this.emailForm.querySelector('button[type="submit"]')
    button.disabled = true
    button.textContent = 'Subscribed!'
  }

  _toggleError(showError) {
    this.emailInput.classList.toggle('error', showError)
  }

  _switchStepVisibility(step) {
    this.dataset.activeStep = step
  }

  reset() {
    setTimeout(() => {
      if (!this.abortController?.signal.aborted) {
        this._resetForm()
      }
    }, 1000)
  }

  _resetForm() {
    this.dataset.activeStep = 1
    this.emailForm?.reset()
    this._toggleError(false)
  }
}

customElements.define('subscription-dialog', SubscriptionDialog)