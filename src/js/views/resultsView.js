import View from './View';
import { replaceCharAt } from '../helper';

class ResultsView extends View {
  _parent = document.querySelector('.results');
  _errorMessage = 'Oops! No book(s) found.';

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
            <a class="preview__link preview__link--active" href="#${book.isbn}">
                <figure class="preview__fig">
                    <img src="${book.coverUrl}" alt="Book Cover" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${book.title}</h4>
                    <p class="preview__author">${book.author}</p>
                    <div class="preview__user-generated">
                        <svg>
                            <use href="src/img/icons.svg#user"></use>
                        </svg>
                </div>
                </div>
            </a>
        </li>`;
  }
}

export default new ResultsView();
