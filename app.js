'use strict'

require("dotenv").config();

const path = require('path');
const fs = require('fs');
const express = require("express");
const http = require('http');
//const https = require('https');
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'html')));

const authRouter = require("./routes/authRouter");
app.use('/api/auth', authRouter);

app.get('/protected', verify, (req, res) =>{
    res.send("inside the protected");
});

app.get('/protected2', verify, (req, res) =>{
    res.send("inside the protected2");
});

const port = process.env.PORT || 3000;

http
  .createServer(app)
  .listen(port, ()=>{
    console.log("API listens on port " + port)
  });

/*
https
  .createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  }, 
  app)
  .listen(port, ()=>{
    console.log("API listens on port " + port)
  });
*/