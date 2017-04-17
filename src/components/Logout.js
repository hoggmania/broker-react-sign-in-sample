import React from 'react';
import PropTypes from 'prop-types';
import { guid, logoutUrl } from '../util/Helpers';
import Storage from '../util/Storage';
import { Container, Button } from 'semantic-ui-react';

/**
 * This is the login button component. Clicking it will execute an
 * OpenID Connect logout request, which revokes the user's access token
 * and ends the current Broker session. The state value used in the
 * logout request is persisted to session storage so that the OAuth 2
 * callback endpoint can use it when checking the redirect response.
 */
const Logout = (props) => {
  const redirect = (event) => {
    console.log("Logging out");
    event.preventDefault();
    const state = guid();
    let storage = new Storage();
    storage.setConfig('state', state);
    props.redirect(logoutUrl(state).toString());
  };

  return (
      <Container>
        <Button
            negative
            icon="sign out"
            labelPosition="left"
            content="Sign out"
            onClick={redirect}
        />
      </Container>
  );
};

Logout.propTypes = {
  redirect: PropTypes.func.isRequired
};

export default Logout;