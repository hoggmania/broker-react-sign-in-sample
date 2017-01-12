import React from 'react';
import { Container, Accordion, Icon, Table } from 'semantic-ui-react';
import './AuthenticationClaims.css';

const ClaimsTable = props => {
  const claims = props.claims;
  return (
      <Table definition>
        <Table.Body>
          {
            Object.keys(claims).map((claim) => {
              return (
                  <Table.Row key={claim}>
                    <Table.Cell>{claim}</Table.Cell>
                    <Table.Cell>{claims[claim]}</Table.Cell>
                  </Table.Row>
              );
            })
          }
        </Table.Body>
      </Table>
  );
};

const AuthenticationClaims = props => (
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

AuthenticationClaims.propTypes = {
  claims: React.PropTypes.object.isRequired
};

export default AuthenticationClaims;