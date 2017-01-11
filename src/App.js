import React, { Component } from 'react';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import { getConfig } from './util/Storage';
import { deleteConfig } from './util/Storage';
import { APP_SETTINGS } from './Config';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleTokens = this.handleTokens.bind(this);
  }

  handleTokens() {
    if (getConfig('accessToken')) {
      this.accessToken = getConfig('accessToken');
      if (!APP_SETTINGS.persistTokens) {
        deleteConfig('accessToken');
      }
    }
    if (getConfig('idToken')) {
      this.idToken = getConfig('idToken');
      if (!APP_SETTINGS.persistTokens) {
        deleteConfig('idToken');
      }
    }
  }

  componentWillMount() {
    this.handleTokens();
  }

  render() {
    return (
      <div>
        <HomeContainer accessToken={this.accessToken} idToken={this.idToken}/>
      </div>
    );
  }
}

export default App;
