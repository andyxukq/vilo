export class Subscription {
  constructor({ className, url, isBtnDisabled = false, callback }) {
    this.className = className;
    this.url = url;
    this.callback = callback;
    this.isBtnDisabled = isBtnDisabled;
  }

  initListener() {
    const forms = document.querySelectorAll(`.${this.className}`);
    if (forms.length === 0) {
      console.warn(
        `Subscription: No forms found with class ".${this.className}"`,
      );
      return;
    }

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => this.handleSubmit(e));
    });
  }

  _getFormData(form) {
    const formData = new FormData(form);
    return {
      email: formData.get("contact[email]"),
    };
  }

  _toggleButtonState(btn, isLoading) {
    if (!btn) return;
    if (isLoading) {
      btn.disabled = true;
      btn.dataset.originalText = btn.innerHTML;
      btn.innerHTML = "Sending...";
    } else {
      btn.disabled = false;
      btn.innerHTML = btn.dataset.originalText || "Submit";
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector("button[type='submit']");
    const data = this._getFormData(form);
    this._toggleButtonState(btn, true);

    try {
      const success = await this._postData(data);
      if (success) {
        if (typeof this.callback === "function") {
          this.callback();
        }
        if (this.isBtnDisabled) {
          btn.innerHTML = "Subscribed!";
          btn.classList.add("disabled");
          btn.disabled = true;
          return;
        }
      } else {
        alert("Subscription failed. Please check your email and try again.");
      }
    } catch (error) {
      console.error("Subscription Error:", error);
      alert("A network error occurred.");
    } finally {
      if (!this.isBtnDisabled || !btn.disabled) {
        this._toggleButtonState(btn, false);
      }
    }
  }

  async _postData(data) {
    console.log({ data })
    return
    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (err) {
      return false;
    }
  }
}
