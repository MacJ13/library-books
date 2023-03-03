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

  console.log(book);

  // create 'book row' element with object property values
  const bookRowEL = generateBookRowELement(book);

  // add book object to array
  myLibrary.push(book);

  // display created element inside 'book-list' class element
  booklist.appendChild(bookRowEL);
  // generateBookElement(book);
  // myLibrary.push(book);
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

  return row;
}

// sumbmit form event
form.addEventListener("submit", addBookToLibrary);
