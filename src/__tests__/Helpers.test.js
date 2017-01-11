import { guid, parseParamsFromUrl } from '../util/Helpers';

describe('The guid() utility function', () => {
  it('returns a string', () => {
    expect(guid()).toMatch(/\w+/);
  });
});

describe('The parseParamsFromUrl() utility function', () => {
  it('handles query parameters', () => {
    const url = 'https://example.com/callback?first=1&second=2';
    const params = parseParamsFromUrl(url);
    expect(params['first']).toEqual('1');
    expect(params['second']).toEqual('2');
  });

  it('handles hash parameters', () => {
    const url = 'https://example.com/callback#first=1&second=2';
    const params = parseParamsFromUrl(url);
    expect(params['first']).toEqual('1');
    expect(params['second']).toEqual('2');
  });

  it('decodes the "%20" sequence as a space character', () => {
    const url = 'https://example.com/callback#error=you%20are%20doing%20it%20wrong';
    const params = parseParamsFromUrl(url);
    expect(params['error']).toEqual('you are doing it wrong');
  });

  it('decodes the "+" character as a space character', () => {
    const url = 'https://example.com/callback#error=you+are+doing+it+wrong';
    const params = parseParamsFromUrl(url);
    expect(params['error']).toEqual('you are doing it wrong');
  });
});