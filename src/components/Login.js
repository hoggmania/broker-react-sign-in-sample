import React from 'react';
import { authorizationUrl } from '../util/Helpers';
import { Container, Message, Button } from 'semantic-ui-react';

const Logout = ({props}) => {
  const redirect = (event) => {
    console.log("Authorizing and/or authenticating");
    event.preventDefault();
    window.location = authorizationUrl().toString();
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

export default Logout;