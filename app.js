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

  // add book object to array
  myLibrary.push(book);

  // generateBookElement(book);
  // myLibrary.push(book);
}

// sumbmit form event
form.addEventListener("submit", addBookToLibrary);
