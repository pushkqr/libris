'use strict';

import icons from 'url:./../img/icons.svg';

console.log(icons);

const bookContainer = document.querySelector('.book');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderSpinner = () => {
  const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#loader"></use>
        </svg>
      </div>
    `;
  bookContainer.innerHTML = ' ';
  bookContainer.insertAdjacentHTML('afterbegin', markup);
};

const showBook = async function () {
  try {
    renderSpinner();

    const res = await fetch('http://localhost:8080/api/v2/books/9780471250609');

    const book = await res.json();

    if (!res.ok) throw new Error(`${data.error} (${res.status})`);

    const img = new Image();
    img.src = book.coverUrl;
    await img.decode();

    const markup = `
        <div class="book__cover">
          <img src="${book.coverUrl}" alt="${book.title}" class="book__img" />
          <h1 class="book__title">
            <span>${book.title}</span>
          </h1>
        </div>

        <div class="book__details">
          <div class="book__info">
            <svg class="book__info-icon">
              <use href="src/img/icons.svg#user"></use>
            </svg>
            <span class="book__info-text">Author:</span>
            <span class="book__info-data">${book.author}</span>
          </div>
          <div class="book__info">
            <svg class="book__info-icon">
              <use href="src/img/icons.svg#calendar"></use>
            </svg>
            <span class="book__info-text">Published:</span>
            <span class="book__info-data">${book.year}</span>
          </div>
          <div class="book__info">
            <svg class="book__info-icon">
              <use href="src/img/icons.svg#book-open"></use>
            </svg>
            <span class="book__info-text">Pages:</span>
            <span class="book__info-data">${book.pages}</span>
          </div>
        </div>

        <div class="book__description">
          ${book.overview}
        </div>

        <div class="book__metadata">
          <div class="book__meta-item">
            <span class="book__meta-label">ISBN</span>
            <span class="book__meta-value">${book.isbn}</span>
          </div>
          <div class="book__meta-item">
            <span class="book__meta-label">Genre</span>
            <span class="book__meta-value">${
              book.genre.length > 1 ? book.genre.join(', ') : book.genre[0]
            }</span>
          </div>
          <div class="book__meta-item">
            <span class="book__meta-label">Publisher</span>
            <span class="book__meta-value">${book.publisher || 'Unknown'}</span>
          </div>
          <div class="book__meta-item">
            <span class="book__meta-label">Language</span>
            <span class="book__meta-value">English</span>
          </div>
        </div>

        <div class="book__actions">
          <button class="btn btn--small book__btn">
            <svg>
              <use href="${icons}#bookmark"></use>
            </svg>
            <span>Save to Library</span>
          </button>
          <button class="btn btn--small book__btn">
            <svg>
              <use href="${icons}#eye"></use>
            </svg>
            <span>Read</span>
          </button>
          <button class="btn btn--small book__btn">
            <svg>
              <use href="${icons}#download"></use>
            </svg>
            <span>Download</span>
          </button>
        </div>`;

    // console.log(markup);
    bookContainer.innerHTML = '';
    bookContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.log(error.message);
  }
};

showBook();
