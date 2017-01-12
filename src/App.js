import React, { Component } from 'react';
import MainContainer from './containers/MainContainer';
import Storage from './util/Storage';
import { Container } from 'semantic-ui-react';
import './App.css';

/**
 * This is the application's main entry point. Its job is to pull any
 * access token or OpenID Connect claims from session storage and pass
 * them to MainContainer as props. MainContainer is then responsible
 * for displaying the main application UI.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.handleTokens = this.handleTokens.bind(this);
  }

  handleTokens() {
    let storage = new Storage();
    if (storage.getConfig('accessToken')) {
      this.accessToken = storage.getConfig('accessToken');
      storage.deleteConfig('accessToken');
    }
    if (storage.getConfig('claims')) {
      this.claims = JSON.parse(storage.getConfig('claims'));
      storage.deleteConfig('claims');
    }
  }

  componentWillMount() {
    this.handleTokens();
  }

  render() {
    return (
      <Container className="App">
        <MainContainer
            accessToken={this.accessToken}
            claims={this.claims}
        />
      </Container>
    );
  }
}

export default App;
