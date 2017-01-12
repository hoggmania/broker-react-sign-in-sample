import React from 'react';
import { guid, authorizationUrl } from '../util/Helpers';
import Storage from '../util/Storage';
import { Container, Message, Button } from 'semantic-ui-react';

const Login = ({props}) => {
  const redirect = (event) => {
    console.log("Authorizing and/or authenticating");
    event.preventDefault();
    const state = guid();
    const nonce = guid();
    let storage = new Storage();
    storage.setConfig('state', state);
    storage.setConfig('nonce', nonce);
    window.location = authorizationUrl(state, nonce).toString();
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

export default Login;