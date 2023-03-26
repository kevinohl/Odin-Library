const myLibrary = [];
const table = document.querySelector("#book-table");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read ? "already read." : "not read yet."
    }`;
  };
}

const book1 = new Book("titleee", "not me", "420", false);
const book2 = new Book("titleex", "also not me", "69", true);
myLibrary.push(book1);
myLibrary.push(book2);

function addBookToLibrary() {
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
  });
}
