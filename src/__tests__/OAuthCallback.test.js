import React from 'react';
import ReactDOM from 'react-dom';
import OAuthCallback from '../OAuthCallback';

jest.mock('../util/Storage');

describe('The callback endpoint', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OAuthCallback/>, div);
  });
});