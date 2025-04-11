import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function  handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}


function handleDelete(completed) {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}



const section = new Section({
  items: initialTodos,
  renderer: (item) => renderTodo(item), // Renderer function
  containerSelector: ".todos__list",
});

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
}

function renderTodo(item) {
  const todo = generateTodo(item);
  section.addItem(todo); // Use the addItem method of the Section class
}

const addTodoPopup = new PopupWithForm({
  popupSelcetor: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
    newTodoValidator.resetValidation();
    todoCounter.updateTotal(true);

    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
