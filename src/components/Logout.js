import React from 'react';
import { guid, logoutUrl } from '../util/Helpers';
import Storage from '../util/Storage';
import { Container, Button } from 'semantic-ui-react';

const Logout = ({props}) => {
  const redirect = (event) => {
    console.log("Logging out");
    event.preventDefault();
    const state = guid();
    let storage = new Storage();
    storage.setConfig('state', state);
    storage.deleteConfig('accessToken');
    storage.deleteConfig('claims');
    window.location = logoutUrl(state).toString();
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

export default Logout;