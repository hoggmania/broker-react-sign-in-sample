import React from 'react';
import AppHeader from './AppHeader';
import { Container, Grid } from 'semantic-ui-react';
import './Layout.css';

const Layout = props => (
    <Container className="Layout">
      <Grid columns="equal">
        <Grid.Column/>
        <Grid.Column width={8}>
          <AppHeader/>
          {props.children}
        </Grid.Column>
        <Grid.Column/>
      </Grid>
    </Container>
);

export default Layout;
