import tokenService from './tokenService';

const BASE_URL = '/api/scores/';

export default {
  index,
  create
};

function index() {
  const options = {
    method: 'GET',
  };
  return fetch(BASE_URL, options).then(res => res.json());
}

function create(score) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      // Add this header - don't forget the space after Bearer
      // NOTE: the pre-pending of the word Bearer to the token, followed by a space, then the token. This is a standard to follow when using token-based authentication
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    body: JSON.stringify(score)
  };
  return fetch(BASE_URL, options).then(res => res.json());
}