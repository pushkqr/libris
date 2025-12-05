import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helper';
import searchView from './views/searchView';

export const state = {
  book: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadBook = async function (id) {
  try {
    // console.log(`${API_URL}/${id}`);
    const book = await getJSON(`${API_URL}/${id}`);
    state.book = book;
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
