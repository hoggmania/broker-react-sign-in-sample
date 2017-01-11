import objectPath from 'object-path';

// This is a limited implementation of a SCIM object. The full path and
// filter capabilities of the SCIM standard are not supported.

class Scim {
  constructor(data) {
    this.data = data;
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

  _getValueFromFilter(attributePath, filterAttribute, operator, filterValue) {
    if (operator !== 'eq') {
      throw new Error(`The '${operator}' operator is unsupported`);
    }
    let complexValue = objectPath.get(this.data, attributePath);
    return complexValue.find(attr => {
      if (typeof(attr[filterAttribute]) === "boolean") {
        return attr[filterAttribute].toString() === filterValue;
      }
      return attr[filterAttribute] === filterValue;
    });
  }

  getValue(path) {
    let parsedForValueFilter = this._parseValueFilter(path);
    if (parsedForValueFilter) {
      try {
        return this._getValueFromFilter(
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
    return objectPath.get(this.data, path);
  }
}

export default Scim;