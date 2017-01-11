import React from 'react';

const UserSumamry = props => (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.username}</h2>
    </div>
);

UserSumamry.propTypes = {
  username: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired
};

export default UserSumamry;
