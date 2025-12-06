import View from './View';
import icons from 'url:./../../img/icons.svg';

class BookmarkView extends View {
  _parent = document.querySelector('.library__list');
  _errorMessage = 'Your library is empty. Search and save your favorite books.';

  async _generateMarkup() {
    const previews = await Promise.all(
      this._data.map(book => this._generateMarkupPreview(book))
    );
    return previews.join('');
  }

  async _generateMarkupPreview(book) {
    await this._preloadCover(book.coverUrl);
    return `
        <li class="preview">
            <a class="preview__link" href="#${book.id}">
                <figure class="preview__fig">
                    <img src="${book.coverUrl}" alt="${book.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${book.title}</h4>
                    <p class="preview__author">${book.author}</p>
                </div>
            </a>
        </li>`;
  }

  renderError(message = this._errorMessage) {
    const markup = ` 
          <div class="message">
            <div>
                <svg>
                <use href="${icons}#book-open"></use>
                </svg>
            </div>
            <p>
                ${message}
            </p>
           </div>`;
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new BookmarkView();
