import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import './AppHeader.css';

const AppHeader = props => (
    <Container className="AppHeader">
      <Header as="h1">Broker Sign In Sample</Header>
    </Container>
);

export default AppHeader;
