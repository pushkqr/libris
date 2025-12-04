'use strict';

import 'core-js';
import 'regenerator-runtime';

import * as model from './model';
import bookView from './views/bookView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

const controlBooks = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    bookView.renderSpinner();
    await model.loadBook(id);

    await bookView.render(model.state.book);
  } catch (error) {
    console.error(error);
    bookView.renderError();
  }
};

const controlSearch = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    await model.searchBook(query);

    console.log(model.state.search);
    await resultsView.render(model.state.search.results);
  } catch (error) {
    // console.error(error);
    resultsView.renderError();
  }
};

const init = () => {
  bookView.addHandlerRender(controlBooks);
  searchView.addHandlerSearch(controlSearch);
};
init();
