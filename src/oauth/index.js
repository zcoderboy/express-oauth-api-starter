const express = require("express");
const oauthServer = require("./server");
require("./auth-config.js");

const router = express.Router();

router.get("/token", oauthServer.token);

module.exports = router;
