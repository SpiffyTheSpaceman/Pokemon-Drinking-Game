const User = require('../models/user');
// A JSON Web Token is a single encoded (not encrypted) string that plays the role of a "token":
// The token can contain whatever custom data (called claims) we want to put in it.
// The token is cryptographically signed by the server when it is created so that if the token is changed in any way, it is considered invalid.
// The token is encoded, but not encrypted. It is encoded using a standard known as base64url encoding so that it can be easily serialized across the internet or even be included in a URL's querystring. It's easy to look at encoded data and think that its content cannot be read, but not true.
const jwt = require('jsonwebtoken');
//JWT String structure: 'HeaderEncoded.PayloadEncoded.SignatureEncoded'
const SECRET = process.env.SECRET;

module.exports = {
   signup,
   login
 };
 
 async function signup(req, res) {
   const user = new User(req.body);
   try {
     await user.save();
     //wait for the user to save and then if successful, create a token using that user.
     const token = createJWT(user);
     // NOTE: The signup method is transporting the token string to the client within an object (assigned to a key named token)
     // Respond to the client with said object.
     // NOTE2: normally we would end with a res.redirect or res.render in a regular express project with data attached on the callback argument. In this case, we just want to send back the data in json format.
     res.json({ token });
   } catch (err) {
     // Probably a duplicate email or something.
     res.status(400).json(err);
   }
 }

 async function login(req, res) {
   try {
      //Wait for the database to return with the user of specified email
     const user = await User.findOne({email: req.body.email});
     if (!user) return res.status(401).json({err: 'Email Incorrect'});
     //NOTE: comparePasswords is a custom class method we added in the user Model.
     user.comparePassword(req.body.password, (err, isMatch) => {
       if (isMatch) {
         const token = createJWT(user);
         // NOTE: The signup method is transporting the token string to the client within an object (assigned to a key named token)
         // Respond to the client with said object.
         // NOTE2: normally we would end with a res.redirect or res.render in a regular express project with data attached on the callback argument. In this case, we just want to send back the data in json format.
         res.json({token});
       } else {
          //Note: the try/catch only applies to the User.findOne. Thus, in the callback function, if the password does not match, we have to manually return an error.
         return res.status(401).json({err: 'Password Incorrect'});
       }
     });
   } catch (err) {
     return res.status(401).json(err);
   }
 }



 /*----- Helper Functions -----*/
// The jsonwebtoken library has a sign method that creates JWTs. Let's add a createJWT helper function at the bottom of controllers/users.js that we can use both when a user signs up and when they log in:
function createJWT(user) {
   //Creating a JWT requires a "secret" string used for "signing" the JWT. Let's defined in our .env file. It can be anything. (TODO: Needs to be added to heroku later)
   return jwt.sign(
     {user}, // data payload
     SECRET,
     {expiresIn: '24h'} //When the token expires.
     //Note: Data saved in localStorage is persisted by domain until removed (as in even if you close the browser). If you want to save data for only the duration of the browser session, use sessionStorage instead.
   );
 }


//----------------- HOW JSON WEB TOKENS WORK:
//  The client app attempts to log in a user by sending an HTTP POST request, sending along the user's credentials.
// The server will, if the creds check out, generate a JWT and send it back to the client. It may be sent back as JSON, or in a header (usually named Token).
// Not shown on the diagram, but important, is the fact that the token needs to be persisted somewhere on the client. In a web app, the token is typically persisted in localStorage.
// The reason a client needs to persist a token is that now, whenever the client makes a request, it can send along the token in the HTTP request, either as a querystring, in the request's body, or, as a best practice, in a header named Authorization.
// The server will then validate the token and respond to the request.


// ------------ ADVANTAGES:
// Sessions are stateful on the server - they have to be maintained in a server's memory or a database. The more active users there are, the more sessions there are to keep track of. High-volume websites require multiple servers and would therefore require special software to manage the sessions.

// The key to token-based authentication is that it's stateless, meaning there is no state being stored on the server regarding the session/login.

// A JSON web token is self-contained, it can itself contain the user's identity, etc. There's no need to fetch the user from a database with each request on the server (an expensive operation). You will only have to query the database for the user if you need to modify the user or obtain additional information from the user document that is not included in the JWT.

// The stateless nature of token-based auth allows the implementation of single sign-on (SSO) - where the same token can be used to access several different applications, for example, Google Mail, Google Docs, etc.

// When making an HTTP request, a token can be sent in an HTTP header (or even the HTTP body). They don't have to be sent in a cookie, which are implemented by web browsers. Thus, you can use token-based authentication without a web browser - great news for native mobile apps.