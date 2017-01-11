const CONFIG_PREFIX = 'com.unboundid.example.';
const STORAGE = window.sessionStorage;

function prefixedKey(key) {
  return `${CONFIG_PREFIX}${key}`;
}

export function getConfig(key) {
  return STORAGE.getItem(prefixedKey(key));
}

export function setConfig(key, value) {
  STORAGE.setItem(prefixedKey(key), value);
}

export function deleteConfig(key) {
  STORAGE.removeItem(prefixedKey(key));
}