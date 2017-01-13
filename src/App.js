import React, { Component } from 'react';
import MainContainer from './containers/MainContainer';
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
    this.state = {
      accessToken: null,
      claims: null
    };
    this.handleTokens = this.handleTokens.bind(this);
  }

  handleTokens() {
    if (this.props.storage.getConfig('accessToken')) {
      this.setState({
        accessToken: this.props.storage.getConfig('accessToken')
      });
      this.props.storage.deleteConfig('accessToken');
    }
    if (this.props.storage.getConfig('claims')) {
      this.setState({
        claims: JSON.parse(this.props.storage.getConfig('claims'))
      });
      this.props.storage.deleteConfig('claims');
    }
  }

  componentWillMount() {
    this.handleTokens();
  }

  render() {
    return (
      <Container className="App">
        <MainContainer
            accessToken={this.state.accessToken}
            claims={this.state.claims}
        />
      </Container>
    );
  }
}

App.propTypes = {
  storage: React.PropTypes.object.isRequired
};

export default App;
