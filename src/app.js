const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");
const oauth = require("./oauth");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  session({ secret: "sessionSecret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);
app.use("/oauth", oauth);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
