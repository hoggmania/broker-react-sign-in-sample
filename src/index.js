import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Storage from './util/Storage';

const storage = new Storage();

ReactDOM.render(
  <App storage={storage}/>,
  document.getElementById('root')
);
