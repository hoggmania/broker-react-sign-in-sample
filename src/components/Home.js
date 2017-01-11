import React from 'react';
import Loading from './Loading';
import SignedInMessage from './SignedInMessage';
import UserDetails from './UserDetails';
import Logout from './Logout';
import ScimResource from '../util/Scim';
import { Container } from 'semantic-ui-react';

const Home = props => {
  return props.isLoading === true
      ? (
          <Loading/>
      )
      : (
          <Container>
            <SignedInMessage user={props.user}/>
            <UserDetails user={props.user}/>
            <Logout/>
          </Container>
      );
};

Home.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  user: React.PropTypes.instanceOf(ScimResource)
};

export default Home;