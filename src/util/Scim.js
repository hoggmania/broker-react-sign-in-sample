import objectPath from 'object-path';

// This is a limited implementation of a SCIM object. The full path and
// filter capabilities of the SCIM standard are not supported.

class ScimResource {
  constructor(data) {
    this.data = data;
    this._checkForExtensionAttribute = this._checkForExtensionAttribute.bind(this);
  }

  _parseValueFilter(path) {
    const VALUE_FILTER_RX = /(\w+)\[(\w+) (\w+)( "?(\w+)"?)?]/;
    let match = VALUE_FILTER_RX.exec(path);
    if (match) {
      return {
        attribute: match[1],
        filterAttribute: match[2],
        operator: match[3],
        filterValue: match[5]
      };
    }
    return null;
  }

  getId() {
    return this.getValue('id');
  }

  getMeta() {
    return this.getValue('meta');
  }

  getSchemaUrns() {
    return this.getValue('schemas');
  }

  _checkForExtensionAttribute(path) {
    const EXTENSION_FILTER_RX = /((urn:.+):)(\w+)/;
    let match = EXTENSION_FILTER_RX.exec(path);
    if (match) {
      return {
        path: match[3],
        object: this.data[match[2]]
      }
    } else {
      return {
        path: path,
        object: this.data
      }
    }
  }

  _getValueFromFilter(obj, attributePath, filterAttribute, operator, filterValue) {
    if (operator !== 'eq') {
      throw new Error(`The '${operator}' operator is unsupported`);
    }
    let complexValue = objectPath.get(obj, attributePath);
    if (!complexValue) {
      return undefined;
    }
    return complexValue.find(attr => {
      if (typeof(attr[filterAttribute]) === "boolean") {
        return attr[filterAttribute].toString() === filterValue;
      }
      return attr[filterAttribute] === filterValue;
    });
  }

  getValue(path) {
    let extensionCheck = this._checkForExtensionAttribute(path);
    let targetObject = extensionCheck.object;
    let attributePath = extensionCheck.path;

    let parsedForValueFilter = this._parseValueFilter(attributePath);
    if (parsedForValueFilter) {
      try {
        return this._getValueFromFilter(
            targetObject,
            parsedForValueFilter.attribute,
            parsedForValueFilter.filterAttribute,
            parsedForValueFilter.operator,
            parsedForValueFilter.filterValue
        );
      } catch (e) {
        console.warn('Error retrieving value', e);
        return null;
      }
    }
    return objectPath.get(targetObject, attributePath);
  }
}

export default ScimResource;