import React from 'react';
import { shallow } from 'enzyme';
import ScimResource from '../util/Scim';
import UserDetails from '../components/UserDetails';
import { readJsonFile } from '../util/TestHelpers';

const testUser = readJsonFile(__dirname + '/resources/user.json');
const testClaims = readJsonFile(__dirname + '/resources/claims.json');

describe('The UserDetails component', () => {
  it("correctly renders a user's attributes from a SCIM resource object", () => {
    const user = new ScimResource(testUser);
    const wrapper = shallow(
        <UserDetails user={user}/>
    );
    expect(wrapper.find('#userDetails-username').childAt(0).text()).toEqual('cesar.aira');
    expect(wrapper.find('#userDetails-name').childAt(0).text()).toEqual('César Aira');
    expect(wrapper.find('#userDetails-email').childAt(0).text()).toEqual('cesar.aira@gmail.com');
    expect(wrapper.find('#userDetails-phone').childAt(0).text()).toEqual('+54 902 987 8135');
    expect(wrapper.find('#userDetails-birthday').childAt(0).text()).toEqual('1949-02-23');
  });

  it("correctly renders a user's attributes from an OpenID Connect claims object", () => {
    const wrapper = shallow(
        <UserDetails claims={testClaims}/>
    );
    expect(wrapper.find('#userDetails-username').childAt(0).text()).toEqual('cesar.aira');
    expect(wrapper.find('#userDetails-name').childAt(0).text()).toEqual('César Aira');
    expect(wrapper.find('#userDetails-email').childAt(0).text()).toEqual('cesar.aira@gmail.com');
    expect(wrapper.find('#userDetails-phone').childAt(0).text()).toEqual('+54 902 987 8135');
    expect(wrapper.find('#userDetails-birthday').childAt(0).text()).toEqual('1949-02-23');
  });
});