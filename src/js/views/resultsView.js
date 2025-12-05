import View from './View';
import icons from 'url:./../../img/icons.svg';

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
}

export default new ResultsView();
