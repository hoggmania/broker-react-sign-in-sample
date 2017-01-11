import React from 'react';
import ScimResource from '../util/Scim';
import { SCHEMA } from '../Config';
import { Container, Table } from 'semantic-ui-react';
import './UserDetails.css';

const UserDetails = props => {
  const valueOrNull = (value) => {
    // Get the .value property of a complex attribute
    if (value && 'value' in value) {
      return value['value'];
    }
    return null;
  };
  const attributes = () => {
    let attrs = {};
    attrs['id'] = props.user.getId();
    attrs['username'] = props.user.getValue(SCHEMA.username);
    attrs['name'] = props.user.getValue(SCHEMA.fullName);
    attrs['email'] = valueOrNull(props.user.getValue(SCHEMA.email));
    attrs['phone'] = valueOrNull(props.user.getValue(SCHEMA.phone));
    return attrs;
  };
  let attrs = attributes();
  return (
      <Container className="UserDetails">
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Username</Table.Cell>
              <Table.Cell>{attrs.username}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>{attrs.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Email address</Table.Cell>
              <Table.Cell>{attrs.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Phone number</Table.Cell>
              <Table.Cell>{attrs.phone}</Table.Cell>
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
