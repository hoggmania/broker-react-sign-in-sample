import React from 'react';
import { logoutUrl } from '../util/Helpers';
import { Container, Button } from 'semantic-ui-react';

const Logout = ({props}) => {
  const redirect = (event) => {
    console.log("Logging out");
    event.preventDefault();
    window.location = logoutUrl().toString();
  };

  return (
      <Container>
        <Button
            icon="sign out"
            labelPosition="left"
            content="Sign out"
            onClick={redirect}
        />
      </Container>
  );
};

export default Logout;