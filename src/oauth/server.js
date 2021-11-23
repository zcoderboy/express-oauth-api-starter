"use strict";

const oauth2orize = require("oauth2orize");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create OAuth 2.0 server
const server = oauth2orize.createServer();

server.serializeClient((client, done) => done(null, client.id));

server.deserializeClient((id, done) => {
  return done(null, {
    id: "some_id",
  });
});

function generateToken(userId, clientId, done) {
  try {
    const dummyUser = {
      id: "1",
      name: "Samba Ndiaye",
      clientId: clientId,
    };
    var token = jwt.sign(dummyUser, process.env.TOKEN_SECRET, {
      expiresIn: 600,
    });
    return done(null, token);
  } catch (err) {
    return done(err);
  }
}

server.exchange(
  oauth2orize.exchange.clientCredentials((client, scope, done) => {
    // Validate the client
    if (
      client.clientId === process.env.TEST_CLIENT_ID &&
      client.clientSecret === process.env.TEST_CLIENT_SECRET
    ) {
      generateToken(null, client.clientId, done);
    }
    return done(null, false);
  })
);

module.exports.token = [
  passport.authenticate(["oauth2-client-password"], {
    session: false,
  }),
  server.token(),
  server.errorHandler(),
];
