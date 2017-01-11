import React from 'react';
import { logoutUrl } from '../util/Helpers';

const Logout = ({props}) => {
  const redirect = (event) => {
    console.log("Logging out");
    event.preventDefault();
    window.location = logoutUrl().toString();
  };

  return (
      <div>
        <button onClick={redirect}>Sign out</button>
      </div>
  );
};

export default Logout;