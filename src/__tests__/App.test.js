import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

jest.mock('../util/Storage');

describe('The app', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
  });
});