'use strict';

import 'core-js';
import 'regenerator-runtime';

import * as model from './model';
import bookView from './views/bookView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

const controlBooks = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    bookView.renderSpinner();
    await model.loadBook(id);

    await bookView.render(model.state.book);
  } catch (error) {
    // console.error(error);
    bookView.renderError();
  }
};

const controlSearch = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    await model.searchBook(query);

    await resultsView.render(model.getSearchResultPage(1));
    await paginationView.render(model.state);
  } catch (error) {
    resultsView.renderError();
  }
};

const controlPagination = async function (page) {
  try {
    resultsView.renderSpinner();
    await resultsView.render(model.getSearchResultPage(page));
    await paginationView.render(model.state);
  } catch (error) {
    resultsView.renderError();
  }
};

const init = () => {
  bookView.addHandlerRender(controlBooks);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};
init();
