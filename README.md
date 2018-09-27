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
  "email": "john.smith@gmail.com",
  "password": "2222",
  "firstName": "John",
  "lastName": "Smith"
}
```
Please note, that if password = 1234, a claim validation error will be thrown. Claim validation is handled at the endpoint.

### Response Body:
```
{
    "status": "1"
}
```
