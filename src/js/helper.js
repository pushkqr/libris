import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const payload = await res.json();

    // Provide clearer error messages when API responds with non-OK
    if (!res.ok) {
      const msg =
        (payload && (payload.error || payload.message)) ||
        `Request failed (${res.status})`;
      throw new Error(msg);
    }

    // Normalize common API wrappers: { book: {...} }, { books: [...] }, { results: [...] }
    if (payload && typeof payload === 'object') {
      if (payload.book) return payload.book;
      if (payload.books) return payload.books;
      if (payload.results) return payload.results;
    }

    return payload;
  } catch (error) {
    throw error;
  }
};

export const debounce = function (fn, delay = 250) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};
