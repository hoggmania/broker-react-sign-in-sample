import React from 'react';
import { APP_SETTINGS } from '../Config';
import { Container, Button } from 'semantic-ui-react';

const HomeButton = ({props}) => {
  const redirect = (event) => {
    console.log("Redirecting to application root");
    event.preventDefault();
    window.location = APP_SETTINGS.rootUri;
  };

  return (
      <Container>
        <Button
            primary
            icon="home"
            labelPosition="left"
            content="Home"
            onClick={redirect}
        />
      </Container>
  );
};

export default HomeButton;