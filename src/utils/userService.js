import tokenService from './tokenService';

const BASE_URL = '/api/users/';

export default {
   signup,
   getUser,
   logout,
   login,
}

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  }) //post triggers our users route, then our users controller (storing the above data as req.method, req.headers, req.body) which responds with the JSON object that stores the JWT which also has the user data under the object key "token"
  .then(res => {
     // if controller did not respond with an error.
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  // Parameter destructure the token from the object and then send it to the tokenService.setToken function which will save it in localstorage for persistence.
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
}

// apps from time-to-time, will need to obtain the logged in user's info or check if there is a user logged in
function getUser() {
   return tokenService.getUserFromToken();
}

function logout() {
   tokenService.removeToken();
 }


 function login(creds) {
   return fetch(BASE_URL + 'login', {
     method: 'POST',
     headers: new Headers({'Content-Type': 'application/json'}),
     body: JSON.stringify(creds)
   }) //post triggers our users route, then our users controller (storing the above data as req.method, req.headers, req.body) which responds with the JSON object that stores the JWT which also has the user data under the object key "token"
   .then(res => {
     // Valid login if we have a status of 2xx (res.ok)
     if (res.ok) return res.json();
     throw new Error('Email or Password Incorrect');
   })
   // Parameter destructure the token from the object and then send it to the tokenService.setToken function which will save it in localstorage for persistence.
   .then(({token}) => tokenService.setToken(token));
 }
 