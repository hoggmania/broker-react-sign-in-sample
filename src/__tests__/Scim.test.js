import Scim from '../util/Scim';

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
        "birthDate": "1998-02-20",
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

describe('The SCIM parser', () => {
  it('can retrieve the resource ID', () => {
    let user = new Scim(JSON.parse(testJson));
    expect(user.getId()).toEqual('2f05b231-8c9d-481d-8b6f-ceefac6852eb');
  });

  it('can retrieve resource metadata', () => {
    let user = new Scim(JSON.parse(testJson));
    expect(user.getMeta().resourceType).toEqual('Users');
  });

  it('can retrieve the schema URNs', () => {
    let user = new Scim(JSON.parse(testJson));
    expect(user.getSchemaUrns()).toContain('urn:pingidentity:schemas:User:1.0');
    expect(user.getSchemaUrns()).toContain('urn:pingidentity:schemas:sample:profile:1.0');
  });

  it('can retrieve the value of a simple attribute', () => {
    let user = new Scim(JSON.parse(testJson));
    expect(user.getValue('userName')).toEqual('cesar.aira');
  });

  it('can retrieve the value of a complex multivalued attribute', () => {
    const expectedHomeEmail = {
      value: "cesar.aira@gmail.com",
      primary: true,
      type: "home"
    };
    const expectedWorkEmail = {
      value: "cesar.aira@work.com",
      primary: false,
      type: "work"
    };
    let user = new Scim(JSON.parse(testJson));
    let emails = user.getValue('emails');
    expect(emails).toContainEqual(expectedHomeEmail);
    expect(emails).toContainEqual(expectedWorkEmail);
  });

  it('can retrieve a value from a complex multivalued attribute using a value filter', () => {
    const expectedHomeEmail = {
      value: "cesar.aira@gmail.com",
      primary: true,
      type: "home"
    };
    const expectedWorkEmail = {
      value: "cesar.aira@work.com",
      primary: false,
      type: "work"
    };
    let user = new Scim(JSON.parse(testJson));
    expect(user.getValue('emails[type eq "home"]')).toEqual(expectedHomeEmail);
    expect(user.getValue('emails[type eq "work"]')).toEqual(expectedWorkEmail);
    expect(user.getValue('emails[primary eq true]')).toEqual(expectedHomeEmail);
  });

  it('does not support operators other than "eq"', () => {
    let user = new Scim(JSON.parse(testJson));
    expect(user.getValue('emails[value sw "César"]')).toThrow();
  });
});