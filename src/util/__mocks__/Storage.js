// Mock of the Storage class that uses a Map instead of Web Storage.
class Storage {
  constructor() {
    this._storage = new Map();
  }

  storage() {
    return this._storage;
  }

  static _prefixedKey(key) {
    const CONFIG_PREFIX = 'com.unboundid.example.';
    return `${CONFIG_PREFIX}${key}`;
  }

  getConfig(key) {
    return this.storage().get(Storage._prefixedKey(key));
  }

  setConfig(key, value) {
    this.storage().put(Storage._prefixedKey(key), value);
  }

  deleteConfig(key) {
    this.storage().delete(Storage._prefixedKey(key));
  }
}

export default Storage;