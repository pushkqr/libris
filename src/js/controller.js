'use strict';

import * as model from './model';
import bookView from './views/bookView';
import 'core-js';
import 'regenerator-runtime';

const showBook = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    bookView.renderSpinner();
    await model.loadBook(id);

    const img = new Image();
    img.src = model.state.book.coverUrl;
    await img.decode();

    bookView.render(model.state.book);
  } catch (error) {
    console.error(error);
    bookView.renderError();
  }
};

const init = () => {
  bookView.addHandlerRender(showBook);
};
init();
