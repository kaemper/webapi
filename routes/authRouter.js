'use strict'

require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  console.log(req.body);
  const username = req.body.name;
  const password = req.body.password;

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
      data: '{ "name":' + username + ', "password": ' + password + "}",
    },
    process.env.TOKEN_SECRET
  );

  res.header("Content-Type", "application/json");
  res.header("Authorization", process.env.AUTHORIZATION_METHOD + " " + token);
  res.status(200).send('{ "message": "Successfully logged in." }');
});

module.exports = router;
