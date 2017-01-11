import React from 'react';

const UserSummary = props => (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.username}</h2>
    </div>
);

UserSummary.propTypes = {
  username: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired
};

export default UserSummary;
