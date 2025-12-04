import { API_URL } from './config';
import { getJSON } from './helper';
import searchView from './views/searchView';

export const state = {
  book: {},
  search: {
    query: '',
    results: [],
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
