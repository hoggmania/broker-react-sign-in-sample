import React, { Component } from 'react';
import HomeContainer from './containers/HomeContainer';
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
  }

  componentWillMount() {
    this.handleTokens();
  }

  render() {
    return (
      <Container className="App">
        <HomeContainer
            accessToken={this.accessToken}
            idToken={this.idToken}
        />
      </Container>
    );
  }
}

export default App;
