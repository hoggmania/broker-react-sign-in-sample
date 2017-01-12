import React, { Component } from 'react';
import MainContainer from './containers/MainContainer';
import Storage from './util/Storage';
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
        />
      </Container>
    );
  }
}

export default App;
