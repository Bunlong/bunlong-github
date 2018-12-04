import { AsyncStorage } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const API_ENDPOINT = "https://api.github.com";

const FETCH_TIMEOUT = (1000 * 30);
const fetchWithTimeout = (url, options) => new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('Request timed out'));
  }, FETCH_TIMEOUT);

  fetch(url, options).then(
    response => resolve(response),
    err => reject(err),
  ).finally(() => clearTimeout(timer));
});

const requestAPI = async (method, path, data, opts = { showAuthNErr: true }) => {
  const options = {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const url = `${API_ENDPOINT}${path}`;
  const resp = await fetchWithTimeout(url, options);
  if (opts.showAuthNErr === true && resp.status === 401) {

  }

  const body = await resp.json();

  return [
    resp.status,
    body,
  ];
};

export const getMe = async () => requestAPI('GET', '/users/bunlong');

export const getStarred = async () => requestAPI('GET', '/users/bunlong/starred');
