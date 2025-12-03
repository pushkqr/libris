import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  book: {},
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
