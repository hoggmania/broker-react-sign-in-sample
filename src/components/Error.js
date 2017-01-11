import React from 'react';

const Error = props => (
    <div className="App">
      <div className="App-header">
        <h2>Error</h2>
      </div>
      <div className="App-intro">
        <p>{props.error}</p>
        <p>{props.errorDetail}</p>
      </div>
    </div>
);

Error.propTypes = {
  error: React.PropTypes.string.isRequired,
  errorDetail: React.PropTypes.string
};

export default Error;
