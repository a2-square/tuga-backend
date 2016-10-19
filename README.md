# Passport

This project is build for secure login using passport.

##Genrate client ID and Client secret key(Facebook and Linkdin) and place it at /config/auth-login/auth_config.js

````````
module.exports = {
  facebook: {
    clientID: 'XXXXXXXXXXXX',
    clientSecret: 'XXXXXXXXXXXXXX',
    callbackURL: 'http://localhost:7000/auth/facebook'
  },
  linkedin: {
    consumerKey: 'XXXXXXXXXXXXXXXXXXXXX',
    consumerSecret: 'XXXXXXXXXXXXXXXXX',
    callbackURL: "http://localhost:7000/auth/linkedin"
  },

};
``````

## Install

```
$ npm install
```

## Run

``````
$ npm start

``````

