import icons from 'url:./../../img/icons.svg';
import { PLACEHOLDER_COVER, IMAGE_TIMEOUT_SEC } from '../config';

export default class View {
  _parent;
  _data;
  _errorMessage;

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

  renderError(message = this._errorMessage) {
    const markup = ` 
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  async _preloadCover(url) {
    const timeout = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('Image load timeout')),
        IMAGE_TIMEOUT_SEC * 1000
      )
    );

    const loadImage = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = url;
    });

    try {
      return await Promise.race([loadImage, timeout]);
    } catch (error) {
      console.warn(`Failed to load cover: ${url}, using placeholder`);
      return PLACEHOLDER_COVER;
    }
  }

  _clear() {
    this._parent.innerHTML = '';
  }
}
