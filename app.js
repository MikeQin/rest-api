// Authors: Michael Qin
const express = require("express");
const app = express();
const basicAuth = require('express-basic-auth')
const port = process.env.PORT || 80;
const bodyParser = require('body-parser');

app.use(basicAuth({
    users: {
    	'admin': 'admin',
    	'user': 'user',
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
    /*return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided';*/
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/signup", function(req, res) {
    var claims = req.body;
    console.log("email: " + claims.email);
    console.log("password: " + claims.password);
    console.log("firstName: " + claims.firstName);
    console.log("lastName: " + claims.lastName);

    if (claims.password == '1234') {
    	res.status(400).json({ error: 'Password is too simple!' });
    }
    else {
    	res.status(200).json({ status: '1' });
    }
});

app.listen(port, () => console.log("/signup API: Listening on port " + port));
