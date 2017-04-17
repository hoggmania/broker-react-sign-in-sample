import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainContainer from './MainContainer';

/**
 * This is the application's main entry point. Its job is to pull any
 * access token or OpenID Connect claims from session storage and pass
 * them to MainContainer as props. MainContainer is then responsible
 * for displaying the main application UI.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      claims: null
    };
    this.getAndDelete = this.getAndDelete.bind(this);
  }

  getAndDelete(key) {
    let value = null;
    if (this.props.storage.getConfig(key)) {
      value = this.props.storage.getConfig(key);
      this.props.storage.deleteConfig(key);
    }
    return value;
  }

  render() {
    const accessToken = this.getAndDelete('accessToken');
    let claims = JSON.parse(this.getAndDelete('claims'));
    return (
      <MainContainer
          accessToken={accessToken}
          claims={claims}
      />
    );
  }
}

App.propTypes = {
  storage: PropTypes.object.isRequired
};

export default App;
