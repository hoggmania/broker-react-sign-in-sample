import React from 'react';
import PropTypes from 'prop-types';
import { Container, Accordion, Icon, Table } from 'semantic-ui-react';
import './AuthenticationClaims.css';

const ClaimsTable = props => {
  return props.claims == null ?
      ( null ) :
      (
          <Table definition>
            <Table.Body>
              {
                Object.keys(props.claims).map((claim) => {
                  return (
                      <Table.Row key={claim}>
                        <Table.Cell>{claim}</Table.Cell>
                        <Table.Cell>{props.claims[claim]}</Table.Cell>
                      </Table.Row>
                  );
                })
              }
            </Table.Body>
          </Table>
      );
};

ClaimsTable.propTypes = {
  claims: PropTypes.object
};

const AuthenticationClaims = props => {
  return props.claims == null ?
      ( null ) :
      (
          <Container className="AuthenticationClaims">
            <Accordion>
              <Accordion.Title>
                <Icon name="dropdown"/>
                Authentication info
              </Accordion.Title>
              <Accordion.Content>
                <ClaimsTable claims={props.claims}/>
              </Accordion.Content>
            </Accordion>
          </Container>
      );
};

AuthenticationClaims.propTypes = {
  claims: PropTypes.object
};

export default AuthenticationClaims;