'use strict';

import 'core-js';
import 'regenerator-runtime';

import * as model from './model';
import bookView from './views/bookView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';
import downloadView from './views/downloadView';

const controlBooks = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (model.state.bookmarks.length > 0)
      await bookmarkView.render(model.state.bookmarks);

    if (!id) return;

    bookView.renderSpinner();
    await model.loadBook(id);

    await bookView.render(model.state.book);
  } catch (error) {
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

const controlAddBookmark = async function () {
  try {
    if (!model.state.book.bookmarked) model.addBookmark(model.state.book);
    else model.deleteBookmark(model.state.book);

    bookView.renderSpinner();
    await bookView.render(model.state.book);
    await bookmarkView.render(model.state.bookmarks);
  } catch (error) {
    bookmarkView.renderError();
  }
};

const controlDownload = async function () {
  try {
    downloadView.showOverlay();
    const links = await model.fetchLinks();

    if (!links || links.length < 1) {
      throw Error('No download links found.');
    }
    downloadView.showDownloadLinks(links);
  } catch (error) {
    downloadView.renderError(error.message);
  }
};

const init = () => {
  bookView.addHandlerRender(controlBooks);
  bookView.addHandlerAddBookmark(controlAddBookmark);
  bookView.addHandlerDownload(controlDownload);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  downloadView.addHandlerClose(() => {});
};
init();
