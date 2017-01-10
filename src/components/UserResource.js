import React, { Component } from 'react';
import { isEmptyObject } from '../util/Helpers';

class UserResource extends Component {
  constructor(props) {
    super(props);
    this.dump = this.dump.bind(this);
  }

  dump(obj) {
    return JSON.stringify(obj);
  }

  render() {
    return isEmptyObject(this.props.data) === true
        ? (
            <h1>NOPE</h1>
        )
        : (
            <div>{this.dump(this.props.data)}</div>
        );
  }
}

UserResource.propTypes = {
  data: React.PropTypes.object
};

export default UserResource;