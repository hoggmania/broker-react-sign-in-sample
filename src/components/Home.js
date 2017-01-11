import React from 'react';
import SignedInMessage from './SignedInMessage';
import UserDetails from './UserDetails';
import Logout from './Logout';
import ScimResource from '../util/Scim';
import { Container } from 'semantic-ui-react';

const Home = props => (
    <Container>
      <SignedInMessage user={props.user}/>
      <UserDetails user={props.user}/>
      <Logout/>
    </Container>
);

Home.propTypes = {
  user: React.PropTypes.instanceOf(ScimResource)
};

export default Home;