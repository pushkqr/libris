import icons from 'url:./../../img/icons.svg';

export default class View {
  _parent;
  _data;
  _errorMessage;

  async render(data) {
    this._data = data;
    const markup = await this._generateMarkup();
    // console.log(markup);
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
    const img = new Image();
    img.src = url;
    await img.decode();
  }

  _clear() {
    this._parent.innerHTML = '';
  }
}
