import React, { Component } from 'react';
import './App.css';
import ProtectedResourceContainer from './containers/UserResourceContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome</h2>
        </div>
        <div className="App-intro">
          <ProtectedResourceContainer/>
        </div>
      </div>
    );
  }
}

export default App;
