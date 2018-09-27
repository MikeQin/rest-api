# REST-API for Azure AD B2C
A Node JS REST API Demo for B2C

## Get Started
```
$ npm install && npm update
$ node app.js
```

## HTTP Client Call:

### API Endpoint:
```
http://localhost/signup
```

### Header:

Basic Auth Credentials: user, user

### POST Request Body:
```
{
  "email": "mike.qin@gmail.com",
  "password": "2222",
  "firstName": "Mike",
  "lastName": "Qin"
}
```

### Response Body:
```
{
    "status": "1"
}
```
