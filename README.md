# Passport

This project is build for secure login using passport.

##Genrate client ID and Client secret key(<a href="https://goldplugins.com/documentation/wp-social-pro-documentation/how-to-get-an-app-id-and-secret-key-from-facebook/">Facebook</a> and <a href="http://wpweb.co.in/documents/social-network-integration/linkedin/">Linkdin</a>) and place it at /config/auth-login/auth_config.js

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

