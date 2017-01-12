import React, { Component } from 'react';
import LayoutContainer from '../containers/LayoutContainer';
import Loading from '../components/Loading';
import Login from '../components/Login';
import Home from '../components/Home';
import Error from '../components/Error';
import ScimResource from '../util/Scim';
import { getUserData } from '../util/Helpers';

/**
 * This class is responsible for displaying the main application UI.
 * If an access token is available via props, then it will use it to
 * retrieve the user profile via SCIM. User profile data may also be
 * available in the OpenID Connect claims received as props. Both the
 * SCIM user object and the OIDC claims are then passed down to child
 * components.
 */
class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingMessage: 'Loading'
    };
    this.handleAccessToken = this.handleAccessToken.bind(this);
    this.handleClaims = this.handleClaims.bind(this);
  }

  handleAccessToken() {
    console.log("Fetching user resource");
    this.setState({
      loadingMesage: 'Retrieving user profile'
    });
    getUserData(this.props.accessToken)
        .catch(ex => {
          console.warn('Error occurred while retrieving user resource (try checking CORS settings)', ex);
          this.setState({
            loadingMessage: null,
            error: "An error occurred while attempting to retrieve your user data."
          });
        })
        .then(response => {
          console.log("User resource retrieved");
          return response.json();
        })
        .then(json => {
          console.log("User resource fetch complete");
          this.setState({
            loadingMessage: null,
            user: new ScimResource(json)
          });
        });
  }

  handleClaims() {
    this.setState({
      loadingMessage: null,
      claims: this.props.claims
    });
  }

  componentDidMount() {
    console.log('accessToken: ', this.props.accessToken);
    console.log('claims: ', this.props.claims);

    if (this.props.accessToken) {
      this.handleAccessToken();
    }
    if (this.props.claims) {
      this.handleClaims();
    }
    if (!this.props.accessToken && !this.props.claims) {
      console.log("No access token or OIDC claims found");
      this.setState({
        loadingMessage: null
      });
    }
  }

  render() {
    if (this.state.error) {
      return (
          <LayoutContainer>
            <Error error={this.state.error}/>
          </LayoutContainer>
      );
    }
    if (this.state.loadingMessage !== null) {
      return (
          <Loading message={this.state.loadingMessage}/>
      );
    }
    return this.state.user || this.state.claims
        ? (
            <LayoutContainer>
              <Home
                  isLoading={this.state.isLoading}
                  user={this.state.user}
                  claims={this.state.claims}
              />
            </LayoutContainer>
        )
        : (
            <LayoutContainer>
              <Login/>
            </LayoutContainer>
        );
    // Note: Rendering the Login component is not strictly necessary.
    // You could instead redirect the user-agent directly to the auth server.
  }
}

MainContainer.propTypes = {
  accessToken: React.PropTypes.string,
  claims: React.PropTypes.object
};

export default MainContainer;