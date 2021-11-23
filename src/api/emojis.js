const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", passport.authenticate("bearer"), (req, res) => {
  res.json(["😀", "😳", "🙄"]);
});

module.exports = router;
