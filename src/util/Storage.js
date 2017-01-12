class Storage {
  storage() {
    return window.sessionStorage;
  }

  static _prefixedKey(key) {
    const CONFIG_PREFIX = 'com.unboundid.example.';
    return `${CONFIG_PREFIX}${key}`;
  }

  getConfig(key) {
    return this.storage().getItem(Storage._prefixedKey(key));
  }

  setConfig(key, value) {
    this.storage().setItem(Storage._prefixedKey(key), value);
  }

  deleteConfig(key) {
    if (this.getConfig(key)) {
      this.storage().removeItem(Storage._prefixedKey(key));
    }
  }
}

export default Storage;