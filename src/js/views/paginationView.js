import View from './View';
import icons from 'url:./../../img/icons.svg';

class PaginationView extends View {
  _parent = document.querySelector('.pagination');

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw Error('No input data to render');
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerClick(handler) {
    this._parent.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.search.results.length / this._data.search.resultsPerPage
    );
    const currPage = this._data.search.page;

    const arrowLeft = `<button data-goto="${
      currPage - 1
    }"class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>`;
    const arrowRight = `<button data-goto="${
      currPage + 1
    }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#arrow-right"></use>
          </svg>
        </button>`;
    const pageInfo = `<span class="pagination__info">Page ${currPage} of ${numPages}</span>`;

    if (currPage === 1 && numPages > 1) {
      return pageInfo + arrowRight;
    }

    if (currPage === numPages && numPages > 1) {
      return arrowLeft + pageInfo;
    }

    if (currPage < numPages) {
      return arrowLeft + pageInfo + arrowRight;
    }

    return pageInfo;
  }
}

export default new PaginationView();
