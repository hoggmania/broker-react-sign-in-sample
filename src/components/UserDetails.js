import React from 'react';
import Scim from '../util/Scim';
import { SCHEMA } from '../Config';

const UserDetails = props => {
  const valueOrNull = (value) => {
    // Get the .value property of a complex attribute
    if (value && 'value' in value) {
      return value['value'];
    }
    return null;
  };
  const attributes = () => {
    const scimUser = new Scim(props.data);
    let attrs = {};
    attrs['id'] = scimUser.getId();
    attrs['username'] = scimUser.getValue(SCHEMA.username);
    attrs['name'] = scimUser.getValue(SCHEMA.fullName);
    attrs['email'] = valueOrNull(scimUser.getValue(SCHEMA.email));
    attrs['phone'] = valueOrNull(scimUser.getValue(SCHEMA.phone));
    return attrs;
  };
  let attrs = attributes();
  return (
      <table>
        <thead>
          <tr>
            <td>attr</td>
            <td>value</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>username</td>
            <td>{attrs.username}</td>
          </tr>
          <tr>
            <td>name</td>
            <td>{attrs.name}</td>
          </tr>
          <tr>
            <td>email</td>
            <td>{attrs.email}</td>
          </tr>
          <tr>
            <td>phone</td>
            <td>{attrs.phone}</td>
          </tr>
        </tbody>
      </table>
  );
};

UserDetails.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default UserDetails;
