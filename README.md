# REST-API for Azure AD B2C
A Node JS REST API Demo for B2C

- Start
```
$ npm install && npm update
$ node app.js
```

- HTTP client call:

-- Header:
Basic Auth Credentials: user, user

-- API endpoint:
```http://localhost/signup```

-- POST request body:
```
{
  "email": "mike.qin@gmail.com",
  "password": "2222",
  "firstName": "Mike",
  "lastName": "Qin"
}
```

-- Response:
```
{
    "status": "1"
}
```
