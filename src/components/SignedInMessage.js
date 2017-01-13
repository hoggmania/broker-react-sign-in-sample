import React, { Component } from 'react';
import { Container, Message } from 'semantic-ui-react';
import ScimResource from '../util/Scim';
import { SCIM_SCHEMA, OIDC_SCHEMA } from '../Config';

class SignedInMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleDismiss() {
    this.setState({
      visible: false
    });
  }

  render() {
    if (this.state.visible) {
      let username = null;
      if (this.props.user) {
        username = this.props.user.getValue(SCIM_SCHEMA.username);
      } else if (this.props.claims) {
        username = this.props.claims[OIDC_SCHEMA.username];
      }
      const message = `You are now signed in as ${username}.`;
      return username != null ? (
              <Container>
                <Message
                    info
                    icon="circle info"
                    content={message}
                    onDismiss={this.handleDismiss}
                />
              </Container>
          ) : null;
    }
    return null;
  }
}

SignedInMessage.propTypes = {
  user: React.PropTypes.instanceOf(ScimResource),
  claims: React.PropTypes.object
};

export default SignedInMessage;