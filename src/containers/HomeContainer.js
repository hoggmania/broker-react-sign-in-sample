import React, { Component } from 'react';
import LayoutContainer from '../containers/LayoutContainer';
import Home from '../components/Home';
import Error from '../components/Error';
import ReactRedirect from 'react-redirect';
import ScimResource from '../util/Scim';
import { authorizationUrl, getUserData } from '../util/Helpers';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    console.log('accessToken: ', this.props.accessToken);
    console.log('idToken: ', this.props.idToken);

    if (this.props.accessToken) {
      console.log("Fetching user resource");
      getUserData(this.props.accessToken)
          .catch(ex => {
            console.warn('Error occurred while retrieving user resource (try checking CORS settings)', ex);
            this.setState({
              error: "An error occurred while attempting to retrieve your user data."
            });
          })
          .then(response => {
            return response.json();
          })
          .then(json => {
            this.setState({
              isLoading: false,
              user: new ScimResource(json)
            });
          });
    } else {
      console.log("Redirecting to auth server");
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
            <ReactRedirect
                location={authorizationUrl().toString()}
            />
        );
  }
}

HomeContainer.propTypes = {
  accessToken: React.PropTypes.string,
  idToken: React.PropTypes.string
};

export default HomeContainer;