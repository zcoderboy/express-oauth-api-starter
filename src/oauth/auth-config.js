"use strict";

const passport = require("passport");
const ClientPasswordStrategy =
  require("passport-oauth2-client-password").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
require("dotenv").config();

passport.serializeUser((client, done) => {
  done(null, client);
});

passport.deserializeUser((id, done) => {
  //Check if user exist in data store
  return done(null, {
    id: 1,
  });
});

function verifyClient(clientId, clientSecret, done) {
  if (
    clientId === process.env.TEST_CLIENT_ID &&
    clientSecret === process.env.TEST_CLIENT_SECRET
  ) {
    return done(null, {
      clientId,
      clientSecret,
    });
  }
  return done(null, false);
}

passport.use(new ClientPasswordStrategy(verifyClient));

passport.use(
  new BearerStrategy((accessToken, done) => {
    try {
      const user = jwt.verify(accessToken, process.env.TOKEN_SECRET);
      if (user) return done(null, user, { scope: "*" });
    } catch (err) {
      return done(err);
    }
  })
);
