import React, { Component } from 'react';
import MainContainer from './containers/MainContainer';
import Storage from './util/Storage';
import { APP_SETTINGS } from './Config';
import { Container } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleTokens = this.handleTokens.bind(this);
  }

  handleTokens() {
    let storage = new Storage();
    if (storage.getConfig('accessToken')) {
      this.accessToken = storage.getConfig('accessToken');
      if (!APP_SETTINGS.persistTokens) {
        storage.deleteConfig('accessToken');
      }
    }
    if (storage.getConfig('idToken')) {
      this.idToken = storage.getConfig('idToken');
      if (!APP_SETTINGS.persistTokens) {
        storage.deleteConfig('idToken');
      }
    }
    if (storage.getConfig('state')) {
      this.state = storage.getConfig('state');
      storage.deleteConfig('state');
    }
    if (storage.getConfig('nonce')) {
      this.nonce = storage.getConfig('nonce');
      storage.deleteConfig('nonce');
    }
  }

  componentWillMount() {
    this.handleTokens();
  }

  render() {
    return (
      <Container className="App">
        <MainContainer
            state={this.state}
            nonce={this.nonce}
            accessToken={this.accessToken}
            idToken={this.idToken}
        />
      </Container>
    );
  }
}

export default App;
