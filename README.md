# broker-react-sign-in-sample [![Build Status](https://travis-ci.org/UnboundID/broker-react-sign-in-sample.svg?branch=master)](https://travis-ci.org/UnboundID/broker-react-sign-in-sample)

![React Sign In Sample animation](https://cloud.githubusercontent.com/assets/50972/21905894/af6b073a-d8ce-11e6-9a4a-a8eb520f9ecb.gif)

This sample demonstrates how a client-side web application written with 
[React](https://facebook.github.io/react/) can use the Data Governance 
Broker as an authentication and authorization server using OAuth 2 and 
OpenID Connect. It shows how an application may:

* Make an OAuth 2/OpenID Connect request
* Handle an OAuth 2/OpenID Connect redirect response
* Verify a JWT ID token signature
* Validate ID token claims
* Perform logout to revoke an access token
* Read JSON Web Keys from a JWKS endpoint
* Retrieve user profile data from a SCIM endpoint
* Retrieve user profile data from ID token claims

## Prerequisites

[NodeJS](https://docs.npmjs.com/getting-started/installing-node) and 
[Yarn](https://yarnpkg.com/en/docs/install) 
must be installed. 

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
yarn
```

Update the Broker's configuration to register the application:

```
dsconfig --no-prompt --batch-file setup.dsconfig
```

Edit the `src/Config.js` file. You'll need to set the `issuer` setting 
to match the issuer URL of the Broker's authentication service:

```javascript
export const OIDC = {
  // The auth server's issuer ID.
  issuer: 'https://example.com',
  // The JWT signing algorithm.
  jwa: 'RS256',
  // The JWK that contains the JWT's public signing key.
  jwkId: 'sample-idtoken-key',
  // A grace period in seconds for verifying time-based claims
  // (e.g., 'iat', 'exp').
  gracePeriod: 15
};
```

And you'll need to set the service URLs for your Broker installation:

```javascript
// Data Governance Broker service URLs.
export const BROKER = {
  authorizeEndpoint: 'https://example.com/oauth/authorize',
  logoutEndpoint: 'https://example.com/oauth/logout',
  jwksEndpoint: 'https://example.com/jwks',
  meEndpoint: 'https://example.com/scim/v2/Me'
};
```

Finally, start the broker-react-sign-in-sample:

```
yarn start
```

This will automatically open the application in a browser window. 
By default, it runs from a local HTTP server at `http://localhost:3000`.

## Building

To create an optimized production build:

```
yarn build
```

Look for output in the `build` directory.

## About this sample

### Basic design

OAuth 2 and OpenID Connect rely on browser redirects to pass 
authorization and authentication tokens between the auth server and the 
client application. For client side applications, data is provided as 
key/value pairs attached to the _fragment_ (or _hash_) component of the 
redirect URL. 

This sample application handles that interaction by defining two endpoints:

1. A main application endpoint at `index.html`
2. A callback endpoint at `callback.html`

The application receives redirects from the auth server at the 
`callback.html` endpoint. This endpoint processes and validates the 
auth data received from the Broker, then redirects to the main 
application's `index.html` endpoint, which performs normal application 
processing. 

Data is shared between the two endpoints using the browser's 
[Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API). 
The main application endpoint clears data from Web Storage as soon as 
it receives it to limit its potential exposure. 

Alternatives to this pattern include:

* Implementing a single endpoint, which performs normal application 
processing and receives redirects. The disadvantage to this design is 
that the presence of callback data in the URL may complicate 
client-side routing.
* Popping up a window to handle redirects. 

### OAuth 2 and OpenID Connect requests

A client-side application such as this has three options for 
interacting with an auth server such as the Data Governance Broker, 
determined by the `response_type` parameter set by the application when 
making its auth request. These options are:

1. `token id_token`: The client requests both an **access token** (an 
authorization credential for data access) and an **ID token** (a data 
structure containing information about the user's authentication state).
2. `token`: The client requests an access token only.
3. `id_token`: The client requests an ID token only.

This in turn determines _how_ the application can obtain user profile 
data.

* If the application uses one of the first two options (`token id_token` 
or `token`), then the application will receive an access token (as well 
as an ID token, in the first case). The access token can be used to make 
separate user data requests to either the 
[UserInfo endpoint](https://developer.unboundid.com/6.0.0.1/broker/api/oauth2/userinfo/) 
or the [SCIM service](https://developer.unboundid.com/6.0.0.1/broker/api/scim/).
* If the application uses the third option (`id_token`), then it will 
receive an ID token only, and it won't be able to make UserInfo or SCIM 
requests. However, the ID token received from the Broker will include 
additional 'claims' containing user profile data. See 
[here](https://developer.unboundid.com/6.0.0.1/broker/api/oauth2/id-tokens/) 
for more information. 

You can change the response type used by the application by modifying 
this block in `src/Config.js`:

```javascript
export const OAUTH_CLIENT = {
  // Unique ID for an OAuth2 Client configured with the Broker
  clientId: 'react-sign-in-sample',
  // Space-delimited list of OAuth2 Scopes
  scope: 'openid email name phone birthday',
  redirectUri: 'http://localhost:3000/callback.html',
  // Valid responseType values are 'token id_token', 'token', and 'id_token'
  responseType: 'token id_token',
  prompt: '',
  acrValues: '',
  maxAge: ''
};
```

Note that the scopes requested by the application — also configured in 
the block above — determine _which_ user profile data are available to 
the application. This is true regardless of the response type used.

For more information about OAuth 2 and OpenID Connect, see the 
[Data Governance Broker Client Developer Guide](https://developer.unboundid.com/6.0.0.1/broker/guides/broker-client-developer-guide/).

## About the config and scripts directories

The build, development server, and unit test scripts are stored in the 
`scripts` directory. Build and test configuration, including 
[Webpack](https://webpack.github.io/) configuration, are stored in the 
`config` directory.

This project was initially created with [create-react-app](https://github.com/facebookincubator/create-react-app) (and react-scripts version 
0.8.5), then ejected so that modifications could be made to the Webpack 
configuration. You may wish to monitor the create-react-app project for 
improvements to the build configuration.

## Other notes

* In development mode, the application listens on an unsecured HTTP 
port. Please be aware that a production web application should always 
be served using HTTPS.
* The application does not support encrypted ID tokens.
* You can use npm if you don't want to use Yarn, though Yarn is 
recommended.

## Support and reporting bugs

This sample is not officially supported, but support will be provided
on a best-effort basis through GitHub. Please be aware that this sample 
is provided for demonstration purposes and is not necessarily intended 
to be production-ready.

Please report issues using the project's
[issue tracker](https://github.com/UnboundID/broker-react-sign-in-sample/issues).

## License

This is licensed under the Apache License 2.0.