import React, { Component } from 'react';
import { parseParamsFromUrl } from './util/Helpers';
import { setConfig } from './util/Storage';
import LayoutContainer from './containers/LayoutContainer';
import Error from './components/Error';
import ReactRedirect from 'react-redirect';
import { Container } from 'semantic-ui-react';
import './App.css';

class OAuthCallback extends Component {
  constructor(props) {
    super(props);
    this.handleCallback = this.handleCallback.bind(this);
  }

  handleCallback(url) {
    let params = parseParamsFromUrl(url);
    if (params['access_token'] || params['id_token']) {
      if (params['access_token']) {
        setConfig('accessToken', params['access_token']);
      }
      if (params['id_token']) {
        setConfig('idToken', params['id_token']);
      }
    }
    if (params['error']) {
      this.error = params['error'];
    }
    if (params['error_description']) {
      this.errorDetail = params['error_description'];
    }
  }

  componentWillMount() {
    this.handleCallback(this.props.url);
  }

  render() {
    if (this.error) {
      return (
          <Container className="App">
            <LayoutContainer>
              <Error error={this.error} errorDetail={this.errorDetail}/>
            </LayoutContainer>
          </Container>
      );
    } else {
      return (
          <ReactRedirect location="/"/>
      );
    }
  }
}

OAuthCallback.defaultProps = {
  url: window.location.href
};

export default OAuthCallback;
