import React, { Component } from 'react';
import objectPath from 'object-path';
import Loading from './Loading';
import UserSummary from './UserSummary';
import UserDetails from './UserDetails';
import Logout from './Logout';
import { SCHEMA } from '../Config';

class Home extends Component {
  constructor(props) {
    super(props);
    this.dump = this.dump.bind(this);
  }

  dump(obj) {
    return JSON.stringify(obj);
  }

  render() {
    return this.props.isLoading === true
        ? (
            <Loading/>
        )
        : (
            <div>
              <UserSummary
                  username={objectPath.get(this.props.data, SCHEMA.username)}
                  name={objectPath.get(this.props.data, SCHEMA.fullName)}
              />
              <UserDetails data={this.props.data}/>
              <Logout/>
            </div>
        );
  }
}

Home.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  data: React.PropTypes.object.isRequired
};

export default Home;