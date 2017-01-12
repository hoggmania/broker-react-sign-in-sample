import URI from 'urijs';
import { OAUTH_CLIENT, BROKER } from '../Config';
import Storage from './Storage';

export function guid() {
  // See: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16|0, v = c === 'x' ? r : ((r&0x3)|0x8);
    return v.toString(16);
  });
}

export function parseParamsFromUrl(url) {
  const uri = URI(url);
  let params = {};
  if (uri.query()) {
    params = parseParams(uri.search());
  }
  if (uri.hash()) {
    params = parseParams(uri.hash());
  }
  return params;
}

function parseParams(rawParams) {
  // See: https://developers.google.com/accounts/docs/OAuth2UserAgent
  let params = {};
  const rx = /([^&=]+)=([^&]*)/g;
  const query_string = rawParams.substring(1);
  let match = rx.exec(query_string);
  while (match) {
    params[URI.decodeQuery(match[1])] = URI.decodeQuery(match[2]);
    match = rx.exec(query_string);
  }
  return params;
}

export function authorizationUrl(state, nonce) {
  let url = URI(BROKER.authorizeEndpoint)
      .addQuery('client_id', OAUTH_CLIENT.clientId)
      .addQuery('response_type', OAUTH_CLIENT.responseType)
      .addQuery('scope', OAUTH_CLIENT.scope)
      .addQuery('redirect_uri', OAUTH_CLIENT.redirectUri)
  if (state) {
    url.addQuery('state', state);
  }
  if (nonce) {
    url.addQuery('nonce', nonce);
  }
  if (OAUTH_CLIENT.prompt) {
    url.addQuery('prompt', OAUTH_CLIENT.prompt);
  }
  if (OAUTH_CLIENT.acrValues) {
    url.addQuery('acr_values', OAUTH_CLIENT.acrValues);
  }
  if (OAUTH_CLIENT.maxAge) {
    url.addQuery('max_age', OAUTH_CLIENT.maxAge);
  }
  return url;
}

export function logoutUrl(state) {
  let url = URI(BROKER.logoutEndpoint)
      .addQuery('post_logout_redirect_uri', OAUTH_CLIENT.redirectUri);
  if (state) {
    url.addQuery('state', state);
  }
  return url;
}

export function getJwks() {
  return fetch(BROKER.jwksEndpoint, {
    method: 'get',
    header: {
      'Accept': 'application/json'
    }
  });
}

export function getUserData(accessToken) {
  return fetch(BROKER.meEndpoint, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/scim+json'
    }
  });
}

export function getClaims() {
  let storage = new Storage();
  if (storage.getConfig('claims')) {
    return JSON.parse(storage.getConfig('claims'));
  }
  return null;
}