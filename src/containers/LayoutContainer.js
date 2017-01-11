import React from 'react';
import AppHeader from '../components/AppHeader';
import { Grid } from 'semantic-ui-react';

const LayoutContainer = props => (
    <Grid columns="equal">
      <Grid.Column/>
      <Grid.Column width={8}>
        <AppHeader/>
        {props.children}
      </Grid.Column>
      <Grid.Column/>
    </Grid>
);

export default LayoutContainer;
