import icons from 'url:./../../img/icons.svg';

class BookView {
  #parent = document.querySelector('.book');
  #book;
  #errorMessage = 'Oops! No book(s) found.';

  render(data) {
    this.#book = data;
    // console.log(icons);
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parent.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#loader"></use>
          </svg>
        </div>
      `;
    this.#clear();
    this.#parent.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = ` 
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this.#clear();
    this.#parent.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  #clear() {
    this.#parent.innerHTML = '';
  }

  //prettier-ignore
  #generateMarkup() {
    return `
        <div class="book__cover">
          <img src="${this.#book.coverUrl}" alt="${this.#book.title}" class="book__img" />
          <h1 class="book__title">
            <span>${this.#book.title}</span>
          </h1>
        </div>

        <div class="book__details">
          <div class="book__info">
            <svg class="book__info-icon">
              <use href="src/img/icons.svg#user"></use>
            </svg>
            <span class="book__info-text">Author:</span>
            <span class="book__info-data">${this.#book.author}</span>
          </div>
          <div class="book__info">
            <svg class="book__info-icon">
              <use href="src/img/icons.svg#calendar"></use>
            </svg>
            <span class="book__info-text">Published:</span>
            <span class="book__info-data">${this.#book.year}</span>
          </div>
          <div class="book__info">
            <svg class="book__info-icon">
              <use href="src/img/icons.svg#book-open"></use>
            </svg>
            <span class="book__info-text">Pages:</span>
            <span class="book__info-data">${this.#book.pages}</span>
          </div>
        </div>

        <div class="book__description">
          ${this.#book.overview}
        </div>

        <div class="book__metadata">
          <div class="book__meta-item">
            <span class="book__meta-label">ISBN</span>
            <span class="book__meta-value">${this.#book.isbn}</span>
          </div>
          <div class="book__meta-item">
            <span class="book__meta-label">Genre</span>
            <span class="book__meta-value">${
              this.#book.genre.length > 1 ? this.#book.genre.join(', ') : this.#book.genre[0]
            }</span>
          </div>
          <div class="book__meta-item">
            <span class="book__meta-label">Publisher</span>
            <span class="book__meta-value">${this.#book.publisher || 'Unknown'}</span>
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

  }
}

export default new BookView();
