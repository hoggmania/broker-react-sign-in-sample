import React from 'react';
import Loading from './Loading';
import UserSummary from './UserSummary';
import UserDetails from './UserDetails';
import Logout from './Logout';
import Scim from '../util/Scim';
import { SCHEMA } from '../Config';

const Home = props => {
  const scimUser = new Scim(props.data);
  return props.isLoading === true
      ? (
          <Loading/>
      )
      : (
          <div>
            <UserSummary
                username={scimUser.getValue(SCHEMA.username)}
                name={scimUser.getValue(SCHEMA.fullName)}
            />
            <UserDetails data={props.data}/>
            <Logout/>
          </div>
      );
};

Home.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  data: React.PropTypes.object.isRequired
};

export default Home;