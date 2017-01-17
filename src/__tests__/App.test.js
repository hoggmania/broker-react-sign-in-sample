import React from 'react';
import { mount } from 'enzyme';
import App from '../containers/App';
import Storage from '../util/__mocks__/Storage';
import { readJsonFile } from '../util/TestHelpers';

global.fetch = require('jest-fetch-mock');

const testAccessToken = 'ACCESS_TOKEN';
const testUser = readJsonFile(__dirname + '/resources/user.json');
const testClaims = readJsonFile(__dirname + '/resources/claims.json');

describe('The app', () => {
  it('passes props to MainContainer correctly when no access token or claims set is present', () => {
    const storage = new Storage();
    const wrapper = mount(
        <App storage={storage}/>
    );
    const mainContainer = wrapper.find('MainContainer').first();
    expect(mainContainer).not.toBeNull();
    expect(mainContainer.props().accessToken).toBeNull();
    expect(mainContainer.props().claims).toBeNull();
  });

  it('passes props to MainContainer correctly when an access token or claims set is present', () => {
    fetch.mockResponseOnce(JSON.stringify(testUser));
    const storage = new Storage();
    storage.setConfig('accessToken', testAccessToken);
    storage.setConfig('claims', JSON.stringify(testClaims));
    const wrapper = mount(
        <App storage={storage}/>
    );
    const mainContainer = wrapper.find('MainContainer').first();
    expect(mainContainer).not.toBeNull();
    expect(mainContainer.props().accessToken).toEqual(testAccessToken);
    expect(mainContainer.props().claims).toEqual(testClaims);
  });
});