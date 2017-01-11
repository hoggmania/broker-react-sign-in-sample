import React from 'react';
import { Container, Message, Icon } from 'semantic-ui-react';

const Error = props => (
    <Container>
      <Message error icon>
        <Icon name="circle warning"/>
        <Message.Content>
          <Message.Header>
            Error
          </Message.Header>
          <p>{props.error}</p>
          <p>{props.errorDetail}</p>
        </Message.Content>
      </Message>
    </Container>
);

Error.propTypes = {
  error: React.PropTypes.string.isRequired,
  errorDetail: React.PropTypes.string
};

export default Error;
