import { MOBILE_BREAKPOINT } from './../config';
import { debounce } from './../helper';
import View from './View';

class MobileNavView extends View {
  _backBtn = document.querySelector('.book__back-btn');
  _bookContainer = document.querySelector('.book');
  _resultsContainer = document.querySelector('.search-results');

  addHandlerBackButton(handler) {
    if (!this._backBtn) return;
    this._backBtn.addEventListener('click', () => {
      this._showResults();
      handler();
    });
  }

  addHandlerMobileNavigation(getSearchResults) {
    if (!this._bookContainer || !this._resultsContainer) return;

    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, () => {
        const id = window.location.hash.slice(1);

        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          const hasSearchResults =
            getSearchResults && getSearchResults().length > 0;

          if (id && hasSearchResults) {
            this._showBook();
          } else if (!id && hasSearchResults) {
            this._showResults();
          } else {
            this._showDefault();
          }
        }
      });
    });

    const handleResize = debounce(() => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        this._bookContainer?.classList.remove('book--mobile-hidden');
        this._resultsContainer?.classList.remove(
          'search-results--mobile-visible'
        );
        this._backBtn?.classList.remove('book__back-btn--visible');
      }
    }, 150);

    window.addEventListener('resize', handleResize);
  }

  _showBook() {
    this._resultsContainer?.classList.remove('search-results--mobile-visible');
    this._bookContainer?.classList.remove('book--mobile-hidden');
    this._backBtn?.classList.add('book__back-btn--visible');
  }

  _showResults() {
    history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search
    );

    this._bookContainer?.classList.add('book--mobile-hidden');
    this._resultsContainer?.classList.add('search-results--mobile-visible');
    this._backBtn?.classList.remove('book__back-btn--visible');
  }

  _showDefault() {
    this._bookContainer?.classList.remove('book--mobile-hidden');
    this._resultsContainer?.classList.remove('search-results--mobile-visible');
    this._backBtn?.classList.remove('book__back-btn--visible');
  }

  showResultsIfMobile() {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      this._showResults();
    }
  }
}

export default new MobileNavView();
