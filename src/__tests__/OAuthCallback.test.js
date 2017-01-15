import React from 'react';
import ReactDOM from 'react-dom';
import OAuthCallback from '../containers/OAuthCallback';
import Storage from '../util/__mocks__/Storage';

const logoutUrl = `http://localhost:3000/callback.html?state=STATE`;

describe('The callback endpoint', () => {
  it('renders without crashing', () => {
    const storage = new Storage();
    storage.setConfig('state', 'STATE');
    const div = document.createElement('div');
    ReactDOM.render(<OAuthCallback url={logoutUrl} storage={storage}/>, div);
  });
});

// TODO: Need to mock fetch so that JWS can be retrieved