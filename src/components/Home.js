import React from 'react';
import SignedInMessage from './SignedInMessage';
import AuthenticationClaims from './AuthenticationClaims';
import UserDetails from './UserDetails';
import Logout from './Logout';
import ScimResource from '../util/Scim';
import { Container } from 'semantic-ui-react';

const Home = props => (
    <Container>
      <SignedInMessage user={props.user} claims={props.claims}/>
      <UserDetails user={props.user} claims={props.claims}/>
      <AuthenticationClaims claims={props.claims}/>
      <Logout/>
    </Container>
);

Home.propTypes = {
  user: React.PropTypes.instanceOf(ScimResource),
  claims: React.PropTypes.object
};

export default Home;