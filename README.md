# REST-API for Azure AD B2C
A Node JS REST API Demo for Azure Active Directory (AD) B2C Custom Policy. Claims exchange through body only. This API is protected with Basic AUTH.

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
