import View from './View';

class ResultsView extends View {
  _parent = document.querySelector('.results');
  _errorMessage = 'Oops! No book(s) found.';
  _preloadedBooks = new Set();

  renderSync(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw Error('No input data to render');
    }
    this._data = data;
    const markup = this._generateMarkupSync();
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkupSync() {
    return this._data
      .map(book => {
        return `
        <li class="preview">
            <a class="preview__link" href="#${book.hash}">
                <figure class="preview__fig">
                    <img src="${book.coverUrl}" alt="${book.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${book.title}</h4>
                    <p class="preview__author">${book.author}</p>
                </div>
            </a>
        </li>`;
      })
      .join('');
  }

  async _generateMarkup() {
    const previews = await Promise.all(
      this._data.map(book => this._generateMarkupPreview(book))
    );
    return previews.join('');
  }

  showNotification(count) {
    const notification = document.createElement('div');
    notification.className = 'results-notification';
    notification.textContent = `${count} book${count !== 1 ? 's' : ''} found`;

    this._parent.insertAdjacentElement('beforebegin', notification);

    setTimeout(
      () => notification.classList.add('results-notification--visible'),
      10
    );

    setTimeout(() => {
      notification.classList.remove('results-notification--visible');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
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
