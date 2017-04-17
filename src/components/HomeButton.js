import React from 'react';
import PropTypes from 'prop-types';
import { APP_SETTINGS } from '../Config';
import { Container, Button } from 'semantic-ui-react';

const HomeButton = (props) => {
  const redirect = (event) => {
    console.log("Redirecting to application root");
    event.preventDefault();
    props.redirect(APP_SETTINGS.rootUri);
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

HomeButton.propTypes = {
  redirect: PropTypes.func.isRequired
};

export default HomeButton;