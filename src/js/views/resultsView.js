import View from './View';

class ResultsView extends View {
  _parent = document.querySelector('.results');
  _errorMessage = 'Oops! No book(s) found.';
  _preloadedBooks = new Set();

  async _generateMarkup() {
    const previews = await Promise.all(
      this._data.map(book => this._generateMarkupPreview(book))
    );
    return previews.join('');
  }

  async _generateMarkupPreview(book) {
    let coverUrl = book.coverUrl;

    if (!this._preloadedBooks.has(book.hash)) {
      coverUrl = await this._preloadCover(book.coverUrl);
      this._preloadedBooks.add(book.hash);
    }
    return `
        <li class="preview">
            <a class="preview__link" href="#${book.hash}">
                <figure class="preview__fig">
                    <img src="${coverUrl}" alt="${book.title}" />
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
