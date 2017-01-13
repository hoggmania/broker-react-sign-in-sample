import React from 'react';
import { shallow } from 'enzyme';
import AuthenticationClaims from '../components/AuthenticationClaims';

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
  email: 'cesar.aira@gmail.com'
};

describe('The AuthenticationClaims component', () => {
  it("correctly renders claims from a given OIDC claims object", () => {
    const wrapper = shallow(
        <AuthenticationClaims claims={testClaims}/>
    );
    expect(wrapper.html()).toContain('Users/2f05b231-8c9d-481d-8b6f-ceefac6852eb');
    expect(wrapper.html()).toContain('cesar.aira');
    expect(wrapper.html()).toContain('cesar.aira@gmail.com');
    expect(wrapper.html()).toContain('https://example.com');
  });
});