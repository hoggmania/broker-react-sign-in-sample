import React from 'react';
import ScimResource from '../util/Scim';
import { getClaims } from '../util/Helpers';
import { SCIM_SCHEMA, OIDC_SCHEMA } from '../Config';
import { Container, Table, Icon } from 'semantic-ui-react';
import './UserDetails.css';

const UserDetails = props => {
  const value = (attr) => {
    // Get the .value property of a complex attribute
    if (attr && 'value' in attr) {
      return attr['value'];
    }
    return null;
  };

  const findAttributes = () => {
    let attrs = {};
    if (props.user) {
      attrs['id'] = props.user.getId();
      attrs['username'] = props.user.getValue(SCIM_SCHEMA.username);
      attrs['name'] = props.user.getValue(SCIM_SCHEMA.fullName);
      attrs['email'] = value(props.user.getValue(SCIM_SCHEMA.email));
      attrs['phone'] = value(props.user.getValue(SCIM_SCHEMA.phone));
      attrs['birthday'] = props.user.getValue(SCIM_SCHEMA.birthday);
    } else if (getClaims()) {
      const claims = getClaims();
      attrs['id'] = claims['sub'];
      attrs['username'] = claims[OIDC_SCHEMA.username];
      attrs['name'] = claims[OIDC_SCHEMA.fullName];
      attrs['email'] = claims[OIDC_SCHEMA.email];
      attrs['phone'] = claims[OIDC_SCHEMA.phone];
      attrs['birthday'] = claims[OIDC_SCHEMA.birthday];
    }
    return attrs;
  };

  let attrs = findAttributes();
  return (
      <Container className="UserDetails">
        <Table definition id="userDetails">
          <Table.Body>
            {
              attrs['username'] &&
              <Table.Row>
                <Table.Cell><Icon name="asterisk"/>Username</Table.Cell>
                <Table.Cell id="userDetails-username">{attrs.username}</Table.Cell>
              </Table.Row>
            }
            {
              attrs['name'] &&
              <Table.Row>
                <Table.Cell><Icon name="user"/>Name</Table.Cell>
                <Table.Cell id="userDetails-name">{attrs.name}</Table.Cell>
              </Table.Row>
            }
            {
              attrs['email'] &&
              <Table.Row>
                <Table.Cell><Icon name="mail"/>Email address</Table.Cell>
                <Table.Cell id="userDetails-email">{attrs.email}</Table.Cell>
              </Table.Row>
            }
            {
              attrs['phone'] &&
              <Table.Row>
                <Table.Cell><Icon name="phone"/>Phone number</Table.Cell>
                <Table.Cell id="userDetails-phone">{attrs.phone}</Table.Cell>
              </Table.Row>
            }
            {
              attrs['birthday'] &&
              <Table.Row>
                <Table.Cell><Icon name="birthday"/>Birthday</Table.Cell>
                <Table.Cell id="userDetails-birthday">{attrs.birthday}</Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>
      </Container>
  );
};

UserDetails.propTypes = {
  user: React.PropTypes.instanceOf(ScimResource)
};

export default UserDetails;
