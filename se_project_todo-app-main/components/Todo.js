class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateSelector = selector;
    this._handleCheck = handleCheck;
    this._id = data.id;
    this._date = data.date;
    this._name = data.name;
    this._completed = data.completed;
    this._handleDelete = handleDelete;
    this._templateElement = document.querySelector(this._templateSelector);
    this._todoElement = this._getTemplate();
    if (!this._templateElement) {
      throw new Error(`Template element not found for selector: ${selector}`);
    }
  }

  setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._remove();
  });
  
    this._checkboxEl.addEventListener("change", () => {
        this._toggleCompletion();
        this._handleCheck(this._completed);
    });
}


_generateNameEl() {
  this._nameEl = this._todoElement.querySelector('.todo__name');
  this._nameEl.textContent = this._data.name;
}

_getTemplate() {
  return document.querySelector(this._templateSelector).content.querySelector('.todo').cloneNode(true);
  } 



 
  _generateDateEl() {
    this._dateEl = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }


  _toggleCompletion() {
    this._completed = !this._completed;
  }


  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    if (!this._todoCheckboxEl || !this._todoLabel) {
      
      return;
    }

    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    this._todoCheckboxEl.checked = this._data.completed;
  }

_remove = () => {
  this._todoElement.remove();
}
  

getView() {
  this._todoElement = this._templateElement.content
    .querySelector(".todo")
    .cloneNode(true);

  if (!this._todoElement) {
    throw new Error("Todo element not found in the template.");
  }

  this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  this._checkboxEl = this._todoElement.querySelector(".todo__completed");

  if (!this._todoDeleteBtn || !this._checkboxEl) {
    console.error("Missing elements in template:", {
      deleteBtn: this._todoDeleteBtn,
      checkbox: this._checkboxEl
    });
    throw new Error("One or more required elements not found.");
  }

  const todoNameEl = this._todoElement.querySelector(".todo__name");

  if (!todoNameEl) {
    throw new Error("Todo name element not found.");
  }

  todoNameEl.textContent = this._data.name;
  this._generateDateEl();
  this._generateCheckboxEl();

  // Ensure the elements are present before setting event listeners
  if (this._todoDeleteBtn && this._checkboxEl) {
    this.setEventListeners();
  }

  return this._todoElement;
}

}

export default Todo;
