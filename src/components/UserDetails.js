import React from 'react';
import ScimResource from '../util/Scim';
import { SCHEMA } from '../Config';
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
    attrs['id'] = props.user.getId();
    attrs['username'] = props.user.getValue(SCHEMA.username);
    attrs['name'] = props.user.getValue(SCHEMA.fullName);
    attrs['email'] = value(props.user.getValue(SCHEMA.email));
    attrs['phone'] = value(props.user.getValue(SCHEMA.phone));
    return attrs;
  };

  let attrs = findAttributes();
  return (
      <Container className="UserDetails">
        <Table definition id="userDetails">
          <Table.Body>
            <Table.Row>
              <Table.Cell><Icon name="asterisk"/>Username</Table.Cell>
              <Table.Cell id="userDetails-username">{attrs.username}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Icon name="user"/>Name</Table.Cell>
              <Table.Cell id="userDetails-name">{attrs.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Icon name="mail"/>Email address</Table.Cell>
              <Table.Cell id="userDetails-email">{attrs.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Icon name="phone"/>Phone number</Table.Cell>
              <Table.Cell id="userDetails-phone">{attrs.phone}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
  );
};

UserDetails.propTypes = {
  user: React.PropTypes.instanceOf(ScimResource)
};

export default UserDetails;
