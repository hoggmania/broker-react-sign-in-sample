import React from 'react';
import { shallow } from 'enzyme';
import Logout from '../components/Logout';
import { BROKER } from '../Config';
import { parseParams, event } from '../util/Helpers';
import URI from 'urijs';

jest.mock('../util/Storage');

describe('The Logout component', () => {
  it("correctly sets a redirect for the auth server", () => {
    const logoutEndpoint = new URI(BROKER.logoutEndpoint);
    const expectedHostname = logoutEndpoint.hostname();
    const expectedPath = logoutEndpoint.path();

    const redirect = jest.fn();
    const wrapper = shallow(
        <Logout redirect={redirect}/>
    );
    wrapper.find('Button').simulate('click', event('foo', 'bar'));

    const logoutUrl = new URI(redirect.mock.calls[0][0]);
    expect(logoutUrl).not.toBeNull();
    expect(logoutUrl.hostname()).toBe(expectedHostname);
    expect(logoutUrl.path()).toBe(expectedPath);
    const params = parseParams(logoutUrl.search());
    expect(params['state']).not.toBeNull();
  });
});