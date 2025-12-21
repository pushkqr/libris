import View from './View';

import icons from 'url:./../../img/icons.svg';

class BookView extends View {
  _parent = document.querySelector('.book');
  _errorMessage = 'Oops! No book(s) found.';

  async render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw Error('No input data to render');
    }
    this._data = data;
    const markup = await this._generateMarkup();
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#loader"></use>
          </svg>
        </div>
      `;
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parent.addEventListener('click', e => {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;

      handler();
    });
  }

  addHandlerDownload(handler) {
    this._parent.addEventListener('click', e => {
      const btn = e.target.closest('.btn--download');
      if (!btn) return;
      handler();
    });
  }

  updateBookmarkButton(bookmarked) {
    requestAnimationFrame(() => {
      const btn = this._parent.querySelector('.btn--bookmark');
      if (!btn) return;

      const icon = btn.querySelector('use');
      const text = btn.querySelector('span');

      icon.setAttribute(
        'href',
        `${icons}#bookmark${bookmarked ? '-fill' : ''}`
      );
      text.textContent = bookmarked ? 'Saved' : 'Save To Library';
    });
  }

  //prettier-ignore
  async _generateMarkup() {
    this._data.coverUrl = await this._preloadCover(this._data.coverUrl);
    return `
        <div class="book__cover">
          <img src="${this._data.coverUrl}" alt="${this._data.title}" class="book__img" />
          <h1 class="book__title">
            <span>${this._data.title}</span>
          </h1>
        </div>

        <div class="book__details">
          <div class="book__info">
            <svg class="book__info-icon">
              <use href="src/img/icons.svg#user"></use>
            </svg>
            <span class="book__info-text">Author:</span>
            <span class="book__info-data">${this._data.author}</span>
          </div>
          <div class="book__info">
            <svg class="book__info-icon">
              <use href="src/img/icons.svg#calendar"></use>
            </svg>
            <span class="book__info-text">Published:</span>
            <span class="book__info-data">${this._data.year}</span>
          </div>
          <div class="book__info">
            <svg class="book__info-icon">
              <use href="src/img/icons.svg#book-open"></use>
            </svg>
            <span class="book__info-text">Pages:</span>
            <span class="book__info-data">${this._data.pages}</span>
          </div>
        </div>

        <div class="book__description">
          ${this._data.overview}
        </div>

        <div class="book__metadata">
          <div class="book__meta-item">
            <span class="book__meta-label">ISBN</span>
            <span class="book__meta-value">${this._data.isbn}</span>
          </div>
          <div class="book__meta-item">
            <span class="book__meta-label">Genre</span>
            <span class="book__meta-value">${
              this._data.genre.length > 1 ? this._data.genre.join(', ') : this._data.genre[0]
            }</span>
          </div>
          <div class="book__meta-item">
            <span class="book__meta-label">Publisher</span>
            <span class="book__meta-value">${this._data.publisher || 'Unknown'}</span>
          </div>
          <div class="book__meta-item">
            <span class="book__meta-label">Language</span>
            <span class="book__meta-value">English</span>
          </div>
        </div>

        <div class="book__actions">
          <button class="btn btn--small book__btn btn--bookmark">
            <svg>
              <use href="${icons}#bookmark${(this._data.bookmarked) ? '-fill' : ''}"></use>
            </svg>
            <span>${(this._data.bookmarked) ? 'Saved' : 'Save To Library'}</span>
          </button>
          <button class="btn btn--small book__btn btn--download">
            <svg>
              <use href="${icons}#download"></use>
            </svg>
            <span>Download</span>
          </button>
        </div>`;

  }
}

export default new BookView();
