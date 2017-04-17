import React from 'react';
import PropTypes from 'prop-types';
import { guid, authorizationUrl } from '../util/Helpers';
import Storage from '../util/Storage';
import { Container, Message, Button } from 'semantic-ui-react';

/**
 * This is the login button component. Clicking it will execute an
 * OAuth 2/OpenID Connect request. The state and nonce values used in
 * the request are persisted to session storage so that the OAuth 2
 * callback endpoint can use them when checking the authz/authn response.
 */
const Login = (props) => {
  const redirect = (event) => {
    console.log("Authorizing and/or authenticating");
    event.preventDefault();
    const state = guid();
    const nonce = guid();
    let storage = new Storage();
    storage.setConfig('state', state);
    storage.setConfig('nonce', nonce);
    props.redirect(authorizationUrl(state, nonce).toString());
  };

  return (
      <Container>
        <Message info>
          <Message.Content>
            <p>Please sign in to continue.</p>
            <Button
                primary
                icon="sign in"
                labelPosition="left"
                content="Sign in"
                onClick={redirect}
            />
          </Message.Content>
        </Message>
      </Container>
  );
};

Login.propTypes = {
  redirect: PropTypes.func.isRequired
};

export default Login;