/**
  Authors: Michael Qin
  https://github.com/MikeQin/rest-api
*/
const express = require("express");
const app = express();
const basicAuth = require('express-basic-auth')
const port = process.env.PORT || 80;
const bodyParser = require('body-parser');

app.use(basicAuth({
    users: {
        'B2cRestClientId': 'admin'
    },
    unauthorizedResponse: getUnauthorizedResponse,
    realm: 'Azure B2C REST API Demo'
}));

function getUnauthorizedResponse(req) {
    var msg;
    if (req.auth) {
    msg = 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected!';
    }
    else {
    msg = 'No credentials provided!';
    }
    console.log('[*] ' + msg);
    
    return msg;
}

function logClaims(claims) {
    console.log("---- log claims ---- ");
    console.log("email: " + claims.email);
    console.log("password: " + claims.password);
    console.log("firstName: " + claims.firstName);
    console.log("lastName: " + claims.lastName);
}

function validateClaims(claims, errors) {
    if (!claims.email) {
        errors.push('email is not defined!');
    }

    if (!claims.password) {
        errors.push('password is not defined!');
    }
       
    if (!claims.firstName) {
        errors.push('firstName is not defined!');
    }

    if (!claims.lastName) {
        errors.push('lastName is not defined!');
    }    

    if (claims.password == '1234') {
        errors.push('password is too simple!');
    }    
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/signup", function(req, res) {
    var claims = req.body;
    var errorsArr = new Array();

    logClaims(claims);
    validateClaims(claims, errorsArr);

    if (errorsArr.length > 0) {
        res.status(400).json({ errors: errorsArr });
    }
    else {
        res.status(200).json({ status: '1' });
    }

});

app.listen(port, () => console.log("/signup API: Listening on port " + port));
