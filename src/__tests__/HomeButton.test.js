import React from 'react';
import { shallow } from 'enzyme';
import HomeButton from '../components/HomeButton';
import { APP_SETTINGS } from '../Config';
import { event } from '../util/Helpers';

jest.mock('../util/Storage');

describe('The HomeButton component', () => {
  it("correctly sets a redirect for the application root", () => {
    const redirect = jest.fn();
    const wrapper = shallow(
        <HomeButton redirect={redirect}/>
    );
    wrapper.find('Button').simulate('click', event('foo', 'bar'));

    const redirectUrl = redirect.mock.calls[0][0];
    expect(redirectUrl).not.toBeNull();
    expect(redirectUrl).toBe(APP_SETTINGS.rootUri);
  });
});