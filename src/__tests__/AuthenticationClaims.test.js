import React from 'react';
import { shallow } from 'enzyme';
import AuthenticationClaims from '../components/AuthenticationClaims';
import { readJsonFile } from '../util/TestHelpers';

const testClaims = readJsonFile(__dirname + '/resources/claims.json');

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