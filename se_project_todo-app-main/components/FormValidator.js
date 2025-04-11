class FormValidator {
  constructor(settings, formEl) {
      this._inputSelector = settings.inputSelector;
      this._formSelector = settings.formSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._errorClass = settings.errorClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._formEl = formEl;
      this._inputList = Array.from(this._formEl.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formEl.querySelector(this._submitButtonSelector);
  }

  _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
          this._showInputError(inputElement);
      } else {
          this._hideInputError(inputElement);
      }
  }

  _toggleButtonState() {
      const hasInvalidInput = this._inputList.some(input => !input.validity.valid);
      if (hasInvalidInput) {
          this._buttonElement.classList.add(this._inactiveButtonClass);
          this._buttonElement.disabled = true;
      } else {
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.disabled = false;
      }
  }



  _showInputError(inputElement,validationMessage) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
   
}

_hideInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass); 
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
}



resetValidation() {
    this._formEl.reset();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }



  _setEventListeners() {
      this._toggleButtonState(); 

      this._inputList.forEach(inputElement => {
          inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
          });
      });
  }

  enableValidation() {
      this._formEl.addEventListener("submit", (evt) => {
          evt.preventDefault();
      });
      this._setEventListeners();
  }
}

export default FormValidator;
