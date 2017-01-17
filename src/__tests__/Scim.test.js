import ScimResource from '../util/Scim';
import { readJsonFile } from '../util/TestHelpers';

const testUser = readJsonFile(__dirname + '/resources/user.json');

describe('The SCIM parser', () => {
  it('can retrieve the resource ID', () => {
    const user = new ScimResource(testUser);
    expect(user.getId()).toEqual('2f05b231-8c9d-481d-8b6f-ceefac6852eb');
  });

  it('can retrieve resource metadata', () => {
    const user = new ScimResource(testUser);
    expect(user.getMeta().resourceType).toEqual('Users');
  });

  it('can retrieve the schema URNs', () => {
    const user = new ScimResource(testUser);
    expect(user.getSchemaUrns()).toContain('urn:pingidentity:schemas:User:1.0');
    expect(user.getSchemaUrns()).toContain('urn:pingidentity:schemas:sample:profile:1.0');
  });

  it('can retrieve the value of a simple attribute', () => {
    const user = new ScimResource(testUser);
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
    const user = new ScimResource(testUser);
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
    const user = new ScimResource(testUser);
    expect(user.getValue('emails[type eq "home"]')).toEqual(expectedHomeEmail);
    expect(user.getValue('emails[type eq "work"]')).toEqual(expectedWorkEmail);
    expect(user.getValue('emails[primary eq true]')).toEqual(expectedHomeEmail);
  });

  it('does not support operators other than "eq"', () => {
    const user = new ScimResource(testUser);
    expect(user.getValue('emails[value sw "César"]')).toThrow();
  });

  it('can retrieve the value of a simple extension attribute', () => {
    const user = new ScimResource(testUser);
    expect(user.getValue('urn:pingidentity:schemas:sample:profile:1.0:birthDate')).toEqual('1949-02-23');
  });

  it('returns undefined for a nonexistent attribute', () => {
    const user = new ScimResource(testUser);
    expect(user.getValue('nonexistent')).toBeUndefined();
  });

  it('returns undefined for a nonexistent attribute with a value filter', () => {
    const user = new ScimResource(testUser);
    expect(user.getValue('nonexistent[type eq "home"]')).toBeUndefined();
  });
});