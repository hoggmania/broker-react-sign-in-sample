import fs from 'fs';

// Stubs an event object.
export function event(name, value) {
  return {
    target: {
      name: name,
      value: value,
    },
    preventDefault: jest.fn()
  };
}

export function readJsonFile(path) {
  return JSON.parse(fs.readFileSync(path));
}