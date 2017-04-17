import React from 'react';
import PropTypes from 'prop-types';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import './Loading.css';

const Loading = props => (
    <Container className="Loading">
      <Dimmer active inverted>
        <Loader>
          {props.message}
        </Loader>
      </Dimmer>
    </Container>
);

Loading.propTypes = {
  message: PropTypes.string
};

export default Loading;