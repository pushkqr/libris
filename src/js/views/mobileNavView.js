import { MOBILE_BREAKPOINT } from './../config';
import { debounce } from './../helper';
import View from './View';

class MobileNavView extends View {
  _bookContainer = document.querySelector('.book');
  _resultsContainer = document.querySelector('.search-results');

  // The view exposes public methods to show/hide mobile sections
  showBook() {
    this._resultsContainer?.classList.remove('search-results--mobile-visible');
    this._bookContainer?.classList.remove('book--mobile-hidden');
  }

  showResults() {
    history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search
    );

    this._bookContainer?.classList.add('book--mobile-hidden');
    this._resultsContainer?.classList.add('search-results--mobile-visible');
  }

  showDefault() {
    this._bookContainer?.classList.remove('book--mobile-hidden');
    this._resultsContainer?.classList.remove('search-results--mobile-visible');
  }

  addHandlerMobileNavigation(getSearchResults) {
    if (!this._bookContainer || !this._resultsContainer) return;

    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, () => {
        const id = window.location.hash.slice(1);

        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          const hasSearchResults =
            getSearchResults && getSearchResults().length > 0;

          if (id) this.showBook();
          else if (!id && hasSearchResults) this.showResults();
          else this.showDefault();
        }
      });
    });

    const handleResize = debounce(() => {
      if (window.innerWidth > MOBILE_BREAKPOINT) this.showDefault();
    }, 150);

    window.addEventListener('resize', handleResize);
  }

  _showBook() {
    this._resultsContainer?.classList.remove('search-results--mobile-visible');
    this._bookContainer?.classList.remove('book--mobile-hidden');
  }

  _showResults() {
    history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search
    );

    this._bookContainer?.classList.add('book--mobile-hidden');
    this._resultsContainer?.classList.add('search-results--mobile-visible');
  }

  _showDefault() {
    this._bookContainer?.classList.remove('book--mobile-hidden');
    this._resultsContainer?.classList.remove('search-results--mobile-visible');
  }

  showResultsIfMobile() {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      this._showResults();
    }
  }
}

export default new MobileNavView();
