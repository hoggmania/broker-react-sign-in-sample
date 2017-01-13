import React from 'react';
import { shallow } from 'enzyme';
import ScimResource from '../util/Scim';
import SignedInMessage from '../components/SignedInMessage';

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

describe('The SignedInMessage component', () => {
  it("correctly reports the username when given a SCIM resource object", () => {
    const user = new ScimResource(JSON.parse(testJson));
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
    const user = new ScimResource(JSON.parse(testJson));
    const wrapper = shallow(
        <SignedInMessage user={user} claims={testClaims}/>
    );
    expect(wrapper.html()).toContain('cesar.aira');
  });
});