const myLibrary = [];
const mainContainer = document.querySelector(".main-container");
const table = document.querySelector("#book-table");
const addButton = document.querySelector("#add-button");
const submitButton = document.querySelector("#book-submit");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.read ? "already read." : "not read yet."
      }`;
    };
  }



const book1 = new Book("titleee", "not me", "420", false);
const book2 = new Book("titleex", "also not me", "69", true);
myLibrary.push(book1);
myLibrary.push(book2);

function renderLibrary() {
  function toggleRead() {
    const currentTitle =
      this.parentNode.parentNode.querySelector("td:first-of-type").textContent;
    const currentBook = myLibrary.find((book) => book.title === currentTitle);
    currentBook.read = !currentBook.read;
    renderLibrary();
  }
  function deleteBook() {
    const currentTitle =
      this.parentNode.parentNode.querySelector("td:first-of-type").textContent;
    const currentBookIndex = myLibrary.findIndex(
      (book) => book.title === currentTitle
    );
    myLibrary.splice(currentBookIndex, 1);
    renderLibrary();
  }
  const currentEntries = document.querySelectorAll("tr td");
  currentEntries.forEach((line) => line.remove());
  myLibrary.forEach((book) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>
      <td><button class="toggle-button">Toggle Read</button></td>
      <td><button class="del-button">Delete</button></td>
    `;
    table.appendChild(newRow);
    const toggleButtons = document.querySelectorAll(".toggle-button");
    toggleButtons.forEach((button) =>
      button.addEventListener("click", toggleRead)
    );
    const deleteButtons = document.querySelectorAll(".del-button");
    deleteButtons.forEach((button) =>
      button.addEventListener("click", deleteBook)
    );
  });
}

function toggleForm() {
  const form = document.querySelector(".form-container");
  const background = document.querySelector(".main-container");
  form.classList.toggle("hidden");
  background.classList.toggle("darkened");
  if (!form.classList.contains("hidden")) {
    mainContainer.addEventListener("click", toggleForm);
  } else mainContainer.removeEventListener("click", toggleForm);
}

addButton.addEventListener("click", (e) => {
  toggleForm();
  e.stopPropagation();
});

function submitBook(event) {
  event.preventDefault();
  const bookForm = document.getElementById("book-form");
  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const bookPages = document.getElementById("pages").value;
  const bookRead = document.getElementById("read").checked;
  if (bookTitle && bookAuthor && bookPages) {
    toggleForm();
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    bookForm.reset();
    myLibrary.push(newBook);
    renderLibrary();
  }
}

submitButton.addEventListener("click", submitBook);

renderLibrary();
