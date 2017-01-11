import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = props => (
    <Dimmer>
      <Loader/>
    </Dimmer>
);

export default Loading;