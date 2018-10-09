/**
  Authors: Michael Qin
  https://github.com/MikeQin/rest-api
*/
const express = require("express");
const app = express();
const basicAuth = require('express-basic-auth')
const port = process.env.PORT || 80;
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

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

function log(claims) {
    console.log("---- log claims ---- ");
    console.log("email: " + claims.email);
}

function validate(claims, errors) {
    if (!claims.userName) {
        errors.push('userName is not defined!');
    }    
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", function(req, res) {
    res.status(200).send('Hello World from b2c-rest-api');
});

app.post("/echo", function(req, res) {
    res.status(200).json({userName: req.body.userName});
});

app.post("/api/migrate", function(req, res) {
    var inputClaims = req.body;
    var errorsArr = new Array();

    //log(inputClaims);
    validate(inputClaims, errorsArr);
    // Inputs
    var userName = inputClaims.userName;
    var password = inputClaims.password;
    var status = inputClaims.status;
    var objectId = inputClaims.objectId;

    if (errorsArr.length > 0) {
        res.status(400).json({ errors: errorsArr });
    }
    else {
        var hashed = bcrypt.hashSync(password, 10);

        if (objectId) {
            status = 2;
        }
        else {
            status = 1;
        }

        console.log('status = ' + status);

        // Outputs
        var outputClaims = {
            userName: userName,
            password: password,
            displayName: 'Joe Smith',
            firstName: 'Joe',
            lastName: 'Smith',
            status: status,
            hashedPassword: hashed
        };

        res.status(200).json(outputClaims);
    }
});

app.listen(port, () => console.log("Listening on port " + port));
