'use strict'

require("dotenv").config();

const jwt=require("jsonwebtoken");

module.exports  = function (req, res, next) {
    if (!req.header("Authorization")) {
        return res.status(401).send("No authorization header specified.");
    }
    // read Authorization header
    const authStrings = req.header("Authorization").split(' ');
    let authorizationMethod = authStrings[0];
    let token = authStrings[1];

    if (!token) {
        return res.status(401).send("No token specified.");
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
         res.status(401).send("Token invalid");
    }
};
