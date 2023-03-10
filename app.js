"use strict";

let myLibrary = [];

const form = document.querySelector(".form");
const checkbox = document.getElementById("read");
const booklist = document.querySelector(".book-list");

// create class Book with some properties
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(e) {
  // stop default behavior of submit event
  e.preventDefault();
  // create variables with input value
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");

  // create value depend on checkbox is checked
  const read = checkbox.checked ? true : false;

  // create new Book object
  const book = new Book(title.value, author.value, +pages.value, read);

  // create 'book row' element with object property values
  const bookElement = generateBookRowELement(book);

  // set data-row attribute on bookRowEl
  bookElement.setAttribute("data-row", myLibrary.length);

  // display created element inside 'book-list' class element
  booklist.appendChild(bookElement);
  // add book object to array
  myLibrary.push(book);

  // clear inputs value
  title.value = "";
  author.value = "";
  pages.value = "";
}

function generateButtonDelete() {
  // create element button and assign button className
  const btn = document.createElement("button");
  btn.className = "btn-delete";

  // create two elements with array values class and add to btn element
  ["left-line", "right-line"].forEach((cls) => {
    const span = document.createElement("span");
    span.className = cls;
    btn.insertAdjacentElement("beforeend", span);
  });

  return btn;
}

function generateBookRowELement(book) {
  // Create li html element and assign "book-row" class
  const row = document.createElement("li");
  row.className = "book-row";

  // loop over object book properties
  for (const property of Object.keys(book)) {
    // if (!book.hasOwnProperty(property)) continue;

    // create html for property and assign property to class name
    const item = document.createElement("span");
    item.className = property;

    // assign textContent element to object property value
    if (property === "read") {
      item.textContent = book[property] ? "read" : "not read";
      book[property] || item.classList.add("uncompleted");
    } else {
      item.textContent = book[property];
    }
    row.insertAdjacentElement("beforeend", item);
  }
  // add 'button delete' element iside created element;
  const btnDelete = generateButtonDelete();
  row.appendChild(btnDelete);

  return row;
}

function removeBookFromLibrary(target) {
  // get book row element from target
  const bookRowEl = target.parentNode;

  // get data-raw attribute value
  const index = bookRowEl.dataset.row;

  // remove book object from array
  myLibrary.splice(index, 1);

  // clear all booklist elements from book row elements
  booklist.innerHTML = "";

  // we generate book row elements again and sign set attribute values
  myLibrary.forEach((book, index) => {
    // create element
    const bookElement = generateBookRowELement(book);

    // set data-row attribute on bookRowEl
    bookElement.setAttribute("data-row", index);

    // add book element to book list element
    booklist.appendChild(bookElement);
  });
}

function toggleReadElement(target) {
  // get parent element of target and take row attribute value
  const index = target.parentNode.dataset.row;

  // get book object element from library array and change read property value
  const book = myLibrary[index];
  book.toggleRead();

  // change text depending on read property value inside book object
  const text = target.textContent === "read" ? "not read" : "read";

  // assign text to element content and toggle class name
  target.textContent = text;
  target.classList.toggle("uncompleted");
}

// submit form event
form.addEventListener("submit", addBookToLibrary);

// book list click event
booklist.addEventListener("click", (e) => {
  const target = e.target;

  // when click on 'read' or 'btn-delete' class element;
  if (target.classList.contains("read")) {
    toggleReadElement(target);
  } else if (target.classList.contains("btn-delete")) {
    removeBookFromLibrary(target);
  }
});
