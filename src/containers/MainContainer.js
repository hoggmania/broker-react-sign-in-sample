import React, { Component } from 'react';
import LayoutContainer from '../containers/LayoutContainer';
import Loading from '../components/Loading';
import Login from '../components/Login';
import Home from '../components/Home';
import Error from '../components/Error';
import ScimResource from '../util/Scim';
import { getUserData } from '../util/Helpers';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingMessage: 'Loading'
    };
    this.fetchProfile = this.fetchProfile.bind(this);
  }

  fetchProfile() {
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
          return response.json();
        })
        .then(json => {
          this.setState({
            loadingMessage: null,
            user: new ScimResource(json)
          });
        });
  }

  componentDidMount() {
    console.log('accessToken: ', this.props.accessToken);
    console.log('idToken: ', this.props.idToken);
    console.log('state: ', this.props.state);
    console.log('nonce: ', this.props.nonce);

    if (this.props.accessToken) {
      this.fetchProfile();
    } else {
      console.log("No access token found");
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
    return this.props.accessToken
        ? (
            <LayoutContainer>
              <Home
                  isLoading={this.state.isLoading}
                  user={this.state.user}
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
  state: React.PropTypes.string,
  nonce: React.PropTypes.string,
  accessToken: React.PropTypes.string,
  idToken: React.PropTypes.string
};

export default MainContainer;