import View from './View';
import icons from 'url:./../../img/icons.svg';

class DownloadView extends View {
  _parent = document.querySelector('.download-overlay');
  _modal = document.querySelector('.download-modal');

  showOverlay() {
    this._parent.classList.remove('hidden');
    this._showLoading();
  }

  hideOverlay() {
    this._parent.classList.add('hidden');
  }

  addHandlerClose(handler) {
    this._parent.addEventListener('click', e => {
      if (e.target.closest('.btn--close-modal') || e.target === this._parent) {
        this.hideOverlay();
        handler();
      }
    });
  }

  _showLoading() {
    document.querySelector('.download-timer').classList.remove('hidden');
    document.querySelector('.download-links').classList.add('hidden');
  }

  showDownloadLinks(links) {
    document.querySelector('.download-timer').classList.add('hidden');
    document.querySelector('.download-links').classList.remove('hidden');

    const markup = links
      .map(
        (link, i) => `
      <a href="${link}" class="btn download-btn" target="_blank" download>
        <svg>
          <use href="${icons}#download"></use>
        </svg>
        <span>Download Option ${i + 1}</span>
      </a>
    `
      )
      .join('');

    document.querySelector('.download-options').innerHTML = markup;
  }
}

export default new DownloadView();
