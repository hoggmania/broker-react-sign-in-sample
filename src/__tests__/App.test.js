import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../containers/App';
import Storage from '../util/__mocks__/Storage';

const testAccessToken = 'ACCESS_TOKEN';

const testClaims = {
  sub: 'Users/2f05b231-8c9d-481d-8b6f-ceefac6852eb',
  at_hash: 'KBg3F2iUGAL16oZd6NLfOw',
  acr: 'Default',
  amr: [ 'pwd' ],
  iss: 'https://example.com',
  auth_time: 1484259664,
  exp: 1484270243,
  iat: 1484269343,
  nonce: '67dab715-f312-42d3-9da1-1d486ca0930f',
  preferred_username: 'cesar.aira',
  email: 'cesar.aira@gmail.com',
  name: 'César Aira',
  phone_number: '+54 902 987 8135',
  birthdate: '1949-02-23'
};

describe('The app', () => {
  it('renders without crashing', () => {
    const storage = new Storage();
    const div = document.createElement('div');
    ReactDOM.render(<App storage={storage}/>, div);
  });

  it('sets its state when no access token or claims set is present', () => {
    const storage = new Storage();
    const wrapper = shallow(
        <App storage={storage}/>
    );
    expect(wrapper.state.accessToken).toBeFalsy();
  });

  it('sets its state when an access token and claims set are present', () => {
    const storage = new Storage();
    storage.setConfig('accessToken', testAccessToken);
    storage.setConfig('claims', JSON.stringify(testClaims));
    const wrapper = shallow(
        <App storage={storage}/>
    );
    expect(wrapper.state('accessToken')).toEqual(testAccessToken);
    expect(wrapper.state('claims')).toEqual(testClaims);
  });
});