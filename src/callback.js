import React from 'react';
import ReactDOM from 'react-dom';
import OAuthCallback from './OAuthCallback';
import Storage from './util/Storage';

const storage = new Storage();
ReactDOM.render(
  <OAuthCallback storage={storage}/>,
  document.getElementById('root')
);
