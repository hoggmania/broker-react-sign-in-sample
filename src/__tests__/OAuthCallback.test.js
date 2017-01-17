import React from 'react';
import { mount } from 'enzyme';
import OAuthCallback from '../containers/OAuthCallback';
import Storage from '../util/__mocks__/Storage';
import JwsVerifier from '../util/JwsVerifier';
import { readJsonFile } from '../util/TestHelpers';

global.fetch = require('jest-fetch-mock');

const jwks = readJsonFile(__dirname + '/resources/jwks.json');
const accessToken = 'ACCESS_TOKEN';
const idToken = 'eyJraWQiOiJzYW1wbGUtaWR0b2tlbi1rZXkiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiLWJOcjRqbFpqc2E1SHpkWWg4N2NWUSIsImFjciI6IkRlZmF1bHQiLCJzdWIiOiJVc2Vyc1wvYmIyNGRhNTktNmE5MS00YzQxLTlhYjctZjRmM2ExNDc5MGI0IiwiYXVkIjoicmVhY3Qtc2lnbi1pbi1zYW1wbGUiLCJhbXIiOlsicHdkIl0sImF1dGhfdGltZSI6MTQ4NDY3NzQxMiwiaXNzIjoiaHR0cHM6XC9cL2V4YW1wbGUuY29tIiwiZXhwIjoxNDg0Njc4MzE1LCJpYXQiOjE0ODQ2Nzc0MTUsIm5vbmNlIjoiTk9OQ0UifQ.Te6G2x2XXI-iaE2DDfoAdIegirUR67RpWpRcZMuVAQQgvoNX2tm9rlNE3PFi7HSiS25wTl5jtT9suMHgCuWmkE1R6Pia7YgKvKQWWKHslzjl6qVt_2R_buv2ys-4bNIH5hefzi0alsvIJtLSbt-VZMXDUR_jZbuMnK2rgs_codM-PbIo_b2-C4zcxkpJUMV-8Cmk3IrmhhL_k4UEdKKO78lrgpSNXp5cGCkOrVUxOggQto5hzUgNwJUbYtu6PRo-S-bi6tU6v11iP3d826Fr4jlQAQ304gFFVWK9eVdzDcW62DB0YgcSgH1zX1loTVwIf4AEh0nVeTjHn07rPtNz_Q';
const accessTokenUrl = `http://localhost:3000/callback.html?access_token=${accessToken}&state=STATE`;
const idTokenUrl = `http://localhost:3000/callback.html?id_token=${idToken}&state=STATE`;
const invalidIdTokenUrl = `http://localhost:3000/callback.html?id_token=INVALID.ID.TOKEN&state=STATE`;
const logoutUrl = `http://localhost:3000/callback.html?state=STATE`;
const gracePeriod = Math.floor(new Date() / 1000);

describe('The callback endpoint', () => {
  it('handles a callback with an access token', () => {
    const jwsVerifier = new JwsVerifier(gracePeriod);
    const storage = new Storage();
    storage.setConfig('state', 'STATE');
    const wrapper = mount(
        <OAuthCallback
            url={accessTokenUrl}
            storage={storage}
            jwsVerifier={jwsVerifier}
        />
    );
    expect(wrapper.state('ready')).toBeTruthy();
  });

  it.skip('handles a callback with a valid id token', () => {
    fetch.mockResponseOnce(JSON.stringify(jwks));
    const jwsVerifier = new JwsVerifier(gracePeriod);
    const storage = new Storage();
    storage.setConfig('state', 'STATE');
    const wrapper = mount(
        <OAuthCallback
            url={idTokenUrl}
            storage={storage}
            jwsVerifier={jwsVerifier}
        />
    );
    // FIXME: ID token verification happens asynchronously, so the following fails
    expect(wrapper.state('ready')).toBeTruthy();
  });

  it.skip('handles a callback with an invalid id token', () => {
    fetch.mockResponseOnce(JSON.stringify(jwks));
    const jwsVerifier = new JwsVerifier(gracePeriod);
    const storage = new Storage();
    storage.setConfig('state', 'STATE');
    const wrapper = mount(
        <OAuthCallback
            url={invalidIdTokenUrl}
            storage={storage}
            jwsVerifier={jwsVerifier}
        />
    );
    // FIXME: ID token verification happens asynchronously, so the following is untrustworthy
    expect(wrapper.state('ready')).toBeFalsy();
  });

  it('handles logout', () => {
    const jwsVerifier = new JwsVerifier(gracePeriod);
    const storage = new Storage();
    storage.setConfig('state', 'STATE');
    const wrapper = mount(
        <OAuthCallback
            url={logoutUrl}
            storage={storage}
            jwsVerifier={jwsVerifier}
        />
    );
    expect(wrapper.state('ready')).toBeTruthy();
  });

  it('sets an error if the state does not match', () => {
    const jwsVerifier = new JwsVerifier(gracePeriod);
    const storage = new Storage();
    storage.setConfig('state', 'OTHER_STATE');
    const wrapper = mount(
        <OAuthCallback
            url={logoutUrl}
            storage={storage}
            jwsVerifier={jwsVerifier}
        />
    );
    expect(wrapper.state('ready')).toBeTruthy();
    expect(wrapper.state('error')).toContain('state');
  });
});