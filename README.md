# broker-react-sign-in-sample [![Build Status](https://travis-ci.org/UnboundID/broker-react-sign-in-sample.svg?branch=master)](https://travis-ci.org/UnboundID/broker-react-sign-in-sample)

This sample demonstrates how a client-side web application can use the Data
Governance Broker as an authentication and authorization server using OpenID
Connect. It shows how an application may:

* Make an OAuth 2/OpenID Connect request
* Handle an OAuth 2/OpenID Connect redirect response
* Verify a JWT ID token signature
* Validate ID token claims
* Perform logout and revoke access tokens
* Read JSON Web Keys from a JWKS endpoint
* Make simple SCIM resource requests for user profile data

## Prerequisites

[NodeJS and npm](https://docs.npmjs.com/getting-started/installing-node) 
must be installed. This application was tested with Node 6.9.x.

The Data Governance Broker must be version 6.0.0.0 and above, and the 
"user and reference app" [starter schema](https://developer.unboundid.com/6.0.0.1/broker/guides/broker-client-developer-guide/basics/schema/#The-starter-schema)
should have been installed. If you have installed a custom schema, then 
you may need to modify the attribute mappings in `src/Config.js`.

## How to run

Clone this repository:

```
git clone https://github.com/UnboundID/broker-react-sign-in-sample.git
```

Install the application's dependencies:

```
cd broker-react-sign-in-sample
npm install
```

Install configuration needed by the application at the Broker:

```
dsconfig --no-prompt --batch-file setup.dsconfig
```

Edit the `src/Config.js` file, substituting the service URLs of your
Broker installation:

```javascript
// Data Governance Broker service URLs.
export const BROKER = {
  authorizeEndpoint: 'https://example.com/oauth/authorize',
  logoutEndpoint: 'https://example.com/oauth/logout',
  jwksEndpoint: 'https://example.com/jwks',
  meEndpoint: 'https://example.com/scim/v2/Me'
};
```

Start the broker-react-sign-in-sample:

```
npm run start
```

This will automatically open the application in a browser window. 
By default, it runs from a local HTTP server at `http://localhost:3000`.

## Notes

* By default, the application listens on an unsecured HTTP port. Please be
aware that a production web application should always be served using HTTPS.
* The application does not support encrypted ID tokens.
* If you have [Yarn](https://yarnpkg.com/) installed, you can use it in 
place of npm.

## Support and reporting bugs

This sample is not officially supported, but support will be provided
on a best-effort basis through GitHub. Please be aware that this sample is
provided for demonstration purposes and is not intended to be production-ready.

Please report issues using the project's
[issue tracker](https://github.com/UnboundID/broker-react-sign-in-sample/issues).

## License

This is licensed under the Apache License 2.0.