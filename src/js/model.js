import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helper';

export const state = {
  book: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadBook = async function (id) {
  try {
    // console.log(`${API_URL}/${id}`);
    const book = await getJSON(`${API_URL}/${id}`);
    state.book = book;

    if (state.bookmarks.some(bookmark => bookmark.hash == book.hash)) {
      state.book.bookmarked = true;
    } else {
      state.book.bookmarked = false;
    }
  } catch (error) {
    throw error;
  }
};

export const searchBook = async function (query) {
  try {
    state.search.query = query;

    const results = await getJSON(
      `${API_URL}?search=${encodeURIComponent(query)}`
    );
    state.search.results = results;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const addBookmark = function (book) {
  state.bookmarks.push(book);

  if (state.book.hash === book.hash) state.book.bookmarked = true;

  persistBookmark();
};

export const deleteBookmark = function (book) {
  const index = state.bookmarks.findIndex(
    bookmark => bookmark.hash === book.hash
  );
  state.bookmarks.splice(index, 1);

  if (state.book.hash === book.hash) state.book.bookmarked = false;

  persistBookmark();
};

export const fetchLinks = async function () {
  try {
    const res = await getJSON(`${API_URL}/${state.book.hash}/download`);
    return res.links;
  } catch (error) {
    throw error;
  }
};

const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const init = function () {
  const storage = JSON.parse(localStorage.getItem('bookmarks'));
  if (storage) state.bookmarks = storage;
};
init();
