import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import ReactRedirect from 'react-redirect';
import { parseParamsFromUrl, getJwks } from './util/Helpers';
import Storage from './util/Storage';
import JwsVerifier from './util/JwsVerifier';
import { OAUTH_CLIENT, OIDC } from './Config';
import LayoutContainer from './containers/LayoutContainer';
import Loading from './components/Loading';
import Error from './components/Error';
import './App.css';

class OAuthCallback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      loadingMessage: 'Loading'
    };
    this.checkState = this.checkState.bind(this);
    this.verifyIdToken = this.verifyIdToken.bind(this);
    this.clearStorage = this.clearStorage.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
  }

  checkState(expectedState, actualState) {
    console.log('Confirming state received from auth server matches');
    if (expectedState === null || actualState === null) {
      console.warn('No state value');
      this.setState({
        error: 'No state value to check.'
      });
    } else {
      if (expectedState !== actualState) {
        console.warn('State mismatch');
        this.setState({
          error: 'Expected state value not received from auth server.'
        });
      }
    }
  }

  verifyIdToken(idToken, expectedNonce) {
    console.log('Validating ID token', idToken);
    this.setState({
      loadingMessage: 'Validating ID token'
    });
    console.log('Retrieving JWKS');
    getJwks().then(response => {
      return response.json();
    }).then(jwks => {
      const jwk = jwks.keys.find((jwk) => {
        return jwk.kid && jwk.kid === OIDC.jwkId;
      });

      const expectedClaims = {
        alg: [ OIDC.jwa ],
        iss: OIDC.issuer,
        aud: OAUTH_CLIENT.clientId,
        nonce: expectedNonce,
        gracePeriod: OIDC.gracePeriod
      };

      try {
        JwsVerifier.verify(idToken, jwk, expectedClaims);
        console.log('Validated ID token');
        this.setState({
          ready: true
        });
      } catch (e) {
        console.warn('ID token is invalid', e);
        this.setState({
          error: 'ID token validation failed.'
        });
        this.clearStorage();
      }
    });
  }

  clearStorage() {
    let storage = new Storage();
    [ 'accessToken', 'idToken', 'state', 'nonce' ].forEach((key) => {
      storage.deleteConfig(key);
    });
  }

  handleCallback(url) {
    let storage = new Storage();
    let params = parseParamsFromUrl(url);

    this.checkState(storage.getConfig('state'), params['state']);

    if (params['access_token'] || params['id_token']) {
      if (params['access_token']) {
        storage.setConfig('accessToken', params['access_token']);
      }
      if (params['id_token']) {
        storage.setConfig('idToken', params['id_token']);
        this.verifyIdToken(params['id_token'], storage.getConfig('nonce'));
      }
    } else {
      if (params['error']) {
        this.setState({
          error: params['error']
        });
      }

      if (params['error_description']) {
        this.setState({
          errorDetail: params['error_description']
        });
      }

      this.setState({
        ready: true
      });
    }
  }

  componentWillMount() {
    this.handleCallback(this.props.url);
  }

  render() {
    if (this.state.error) {
      return (
          <Container className="App">
            <LayoutContainer>
              <Error
                  error={this.state.error}
                  errorDetail={this.state.errorDetail}
              />
            </LayoutContainer>
          </Container>
      );
    }
    if (this.state.ready) {
      return (
          <ReactRedirect location="/"/>
      );
    }
    return (
        <Loading message={this.state.loadingMessage}/>
    );
  }
}

OAuthCallback.defaultProps = {
  url: window.location.href
};

export default OAuthCallback;
