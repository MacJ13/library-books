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
