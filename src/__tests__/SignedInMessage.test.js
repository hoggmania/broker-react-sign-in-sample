import React from 'react';
import { shallow } from 'enzyme';
import ScimResource from '../util/Scim';
import SignedInMessage from '../components/SignedInMessage';
import { readJsonFile } from '../util/TestHelpers';

const testUser = readJsonFile(__dirname + '/resources/user.json');
const testClaims = readJsonFile(__dirname + '/resources/claims.json');

describe('The SignedInMessage component', () => {
  it("correctly reports the username when given a SCIM resource object", () => {
    const user = new ScimResource(testUser);
    const wrapper = shallow(
        <SignedInMessage user={user}/>
    );
    expect(wrapper.html()).toContain('cesar.aira');
  });

  it("correctly reports the username when given an OIDC claims object", () => {
    const wrapper = shallow(
        <SignedInMessage claims={testClaims}/>
    );
    expect(wrapper.html()).toContain('cesar.aira');
  });

  it("correctly reports the username when given both a " +
      "SCIM resource object and an OIDC claims object", () => {
    const user = new ScimResource(testUser);
    const wrapper = shallow(
        <SignedInMessage user={user} claims={testClaims}/>
    );
    expect(wrapper.html()).toContain('cesar.aira');
  });
});