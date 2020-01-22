// Config to add the user in req.user object.

// Serverside module that will export a custom middleware function that:
// Checks if there's a token in the headers of the HTTP request. For additional flexibility, we'll also check for a token being sent in the query string or the body of the request.
// Verifies the token is valid and hasn't expired.
// Decodes the token to obtain the user data from its payload.
// Then finally, adds the user payload to the Express request object

//NOTE: Although we will have req.user like when we used passport, this user property will not be an actual Mongoose document, it's just a plain JS object that we're grabbing from the token. This is very lightweight and performant. However, if you need to perform any CRUD on an actual document for the logged in user, you will have to query the DB to obtain the user document first using req.user._id provided by the token.

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  // Check for the token being sent in three different ways:
  // In the header (which is how we are doing it)
  // in a query string
  // or in the body
  // Adding this extra flexibility costs nothing and may allow our API to be accessed from other apps/devices more easily.
  let token = req.get('Authorization') || req.query.token || req.body.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid and not expired
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        next(err);
      } else {
        // It's a valid token, so add user to req
        req.user = decoded.user;    
        next();
      }
    });
  } else {
    next();
  }
};