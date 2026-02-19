import { EMAIL_API } from "./utils"

export class Subscription {
  constructor() {
    this.url = EMAIL_API
    this.callback = () => {
      window.location.href = "/product"
    }
  }

  initListener() {
    const forms = document.querySelectorAll(`.contact-us-form form`)
    if (forms.length === 0) {
      console.log("Subscription: No forms found.")
      return
    }

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => this.handleSubmit(e))
      const emailInput = form.querySelector('input[type="email"]')
      if (emailInput) {
        emailInput.addEventListener("input", () => {
          this._toggleEmailError(form, false)
        })
      }
    })
  }

  _getFormData(form) {
    const formData = new FormData(form)

    const extraFields = Object.fromEntries(
      Array.from(formData).filter(([key]) => key !== "email"),
    )

    const result = {
      email: formData.get("email"),
    }

    if (Object.keys(extraFields).length > 0) {
      result.content = extraFields
    }

    return result
  }

  _toggleButtonState(btn, isDisabled) {
    if (!btn) return
    btn.disabled = isDisabled
  }

  _emailInputValidation(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  _toggleEmailError(form, showError) {
    form.classList.toggle("emailError", showError)
  }

  async handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const btn = form.querySelector("button[type='submit']");
    const data = this._getFormData(form)

    if (!this._emailInputValidation(data.email)) {
      this._toggleEmailError(form, true)
      return
    }

    this._toggleEmailError(form, false)
    this._toggleButtonState(btn, true)

    try {
      const success = await this._postData(data)
      if (success) {
        if (typeof this.callback === "function") {
          this.callback()
        }
      }
    } catch (error) {
      console.error("Subscription Error:", error)
    }
  }

  async _postData(data) {
    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
      return response.ok
    } catch (err) {
      console.error("_postData Error:", err)
      return false
    }
  }
}

const subscription = new Subscription()
subscription.initListener()
