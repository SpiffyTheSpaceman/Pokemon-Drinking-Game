function setToken(token) {
   if (token) {
     localStorage.setItem('token', token);
   } else {
     localStorage.removeItem('token');
   } 
 }

function getToken() {
   let token = localStorage.getItem('token');
   if (token) {
     // Check if expired, remove if it is
     // NOTE: JWT String structure: 'HeaderEncoded.PayloadEncoded.SignatureEncoded' atob decodes base-64 data, btoa encodes into base-64 data.
     // NOTE: we split at [1] because thats where the payload data/the actual document is.
     const payload = JSON.parse(atob(token.split('.')[1]));
     // JWT's exp is expressed in seconds, not milliseconds, so convert
     // in JWT, expiration date is stored in payload.exp.
     if (payload.exp < Date.now() / 1000) {
       localStorage.removeItem('token');
       token = null;
     }
   }
   return token;
}

function getUserFromToken () {
   const token = getToken();
   // NOTE: we split at [1] because thats where the payload data/the actual document is.
   return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

function removeToken() {
   localStorage.removeItem('token');
}
 
 export default {
   setToken,
   getToken,
   getUserFromToken,
   removeToken,
 };