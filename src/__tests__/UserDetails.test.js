import React from 'react';
import { shallow } from 'enzyme';
import ScimResource from '../util/Scim';
import UserDetails from '../components/UserDetails';

jest.mock('../util/Storage');

const testJson = `
{
    "id": "2f05b231-8c9d-481d-8b6f-ceefac6852eb",
    "meta": {
        "resourceType": "Users",
        "created": "2016-11-16T17:15:27.251Z",
        "lastModified": "2017-01-10T22:55:10.549Z",
        "location": "https://example.com/scim/v2/Users/2f05b231-8c9d-481d-8b6f-ceefac6852eb"
    },
    "schemas": [
        "urn:pingidentity:schemas:sample:profile:1.0",
        "urn:pingidentity:schemas:User:1.0"
    ],
    "phoneNumbers": [
        {
            "value": "+54 902 987 8135",
            "type": "mobile",
            "primary": true
        },
        {
            "value": "+54 307 514 3836",
            "type": "work",
            "primary": false
        },
        {
            "value": "+54 036 928 0154",
            "type": "home",
            "primary": false
        }
    ],
    "name": {
        "familyName": "Aira",
        "formatted": "César Aira",
        "givenName": "César"
    },
    "urn:pingidentity:schemas:sample:profile:1.0": {
        "birthDate": "1949-02-23",
        "topicPreferences": [
            {
                "id": "urn:X-pingidentity:topic:auto:maintenance",
                "strength": -3,
                "timeStamp": "2013-10-18T22:53:58Z"
            },
            {
                "id": "urn:X-pingidentity:topic:health:men",
                "strength": -10,
                "timeStamp": "2014-10-20T12:13:11Z"
            }
        ]
    },
    "userName": "cesar.aira",
    "emails": [
        {
            "value": "cesar.aira@gmail.com",
            "primary": true,
            "type": "home"
        },
        {
            "value": "cesar.aira@work.com",
            "primary": false,
            "type": "work"
        }
    ]
}
`;

describe('The UserDetails component', () => {
  it("correctly renders a user's attributes", () => {
    const user = new ScimResource(JSON.parse(testJson));
    const wrapper = shallow(
        <UserDetails user={user}/>
    );
    expect(wrapper.find('#userDetails-username').childAt(0).text()).toEqual('cesar.aira');
    expect(wrapper.find('#userDetails-name').childAt(0).text()).toEqual('César Aira');
    expect(wrapper.find('#userDetails-email').childAt(0).text()).toEqual('cesar.aira@gmail.com');
    expect(wrapper.find('#userDetails-phone').childAt(0).text()).toEqual('+54 902 987 8135');
    expect(wrapper.find('#userDetails-birthday').childAt(0).text()).toEqual('1949-02-23');
  });
});