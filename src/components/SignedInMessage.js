import React, { Component } from 'react';
import ScimResource from '../util/Scim';
import { Container, Message } from 'semantic-ui-react';
import { SCHEMA } from '../Config';

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
      const username = this.props.user.getValue(SCHEMA.username);
      const message = `You are now signed in as ${username}.`;
      return (
          <Container>
            <Message
                info
                icon="circle info"
                content={message}
                onDismiss={this.handleDismiss}
            />
          </Container>
      )
    }
    return null;
  }
}

SignedInMessage.propTypes = {
  user: React.PropTypes.instanceOf(ScimResource).isRequired
};

export default SignedInMessage;