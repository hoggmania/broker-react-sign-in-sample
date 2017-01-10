import React, { Component } from 'react';
import UserResource from '../components/UserResource';
import { getConfig } from '../util/Storage';

class UserResourceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    if (getConfig('accessToken')) {
      // TODO: Retrieve user resource and set this.state.data
    } else {
      // TODO: Redirect to auth server
    }
  }

  render() {
    return (
        <UserResource data={this.state.data}/>
    );
  }
}

export default UserResourceContainer;