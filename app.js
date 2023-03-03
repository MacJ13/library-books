let myLibrary = [];

const form = document.querySelector(".form");
const checkbox = document.getElementById("read");
const booklist = document.querySelector(".book-list");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(e) {
  // stop default behavior of submit event
  e.preventDefault();

  // create variables with input value
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  // create value depend on checkbox is checked
  const read = checkbox.checked ? true : false;

  // create new Book object
  const book = new Book(title, author, +pages, read);

  // create 'book row' element with object property values
  const bookElement = generateBookRowELement(book);

  // set data-row attribute on bookRowEl
  bookElement.setAttribute("data-row", myLibrary.length);

  // add book object to array
  myLibrary.push(book);

  // display created element inside 'book-list' class element
  booklist.appendChild(bookElement);
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
  for (const property in book) {
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
  // add 'button' element iside created element;
  const btnDelete = generateButtonDelete();
  row.appendChild(btnDelete);

  return row;
}

// submit form event
form.addEventListener("submit", addBookToLibrary);

// book list click event
booklist.addEventListener("click", (e) => {});
