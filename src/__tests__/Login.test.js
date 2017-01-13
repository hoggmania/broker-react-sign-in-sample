import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/Login';
import { OAUTH_CLIENT, BROKER } from '../Config';
import { parseParams, event } from '../util/Helpers';
import URI from 'urijs';

jest.mock('../util/Storage');

describe('The Login component', () => {
  it("correctly sets a redirect for the auth server", () => {
    const authEndpoint = new URI(BROKER.authorizeEndpoint);
    const expectedHostname = authEndpoint.hostname();
    const expectedPath = authEndpoint.path();

    const redirect = jest.fn();
    const wrapper = shallow(
        <Login redirect={redirect}/>
    );
    wrapper.find('Button').simulate('click', event('foo', 'bar'));

    const authUrl = new URI(redirect.mock.calls[0][0]);
    expect(authUrl).not.toBeNull();
    expect(authUrl.hostname()).toBe(expectedHostname);
    expect(authUrl.path()).toBe(expectedPath);
    const params = parseParams(authUrl.search());
    expect(params['client_id']).toBe(OAUTH_CLIENT.clientId);
    expect(params['response_type']).toBe(OAUTH_CLIENT.responseType);
    expect(params['scope']).toBe(OAUTH_CLIENT.scope);
    expect(params['redirect_uri']).toBe(OAUTH_CLIENT.redirectUri);
    expect(params['state']).not.toBeNull();
    expect(params['nonce']).not.toBeNull();
  });
});