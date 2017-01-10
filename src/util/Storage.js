const CONFIG_PREFIX = 'com.unboundid.example.';
const STORAGE = window.sessionStorage;

export function getConfig(key) {
  return STORAGE.getItem(`${CONFIG_PREFIX}${key}`);
}

export function setConfig(key, value) {
  STORAGE.setItem(`${CONFIG_PREFIX}${key}`, value);
}