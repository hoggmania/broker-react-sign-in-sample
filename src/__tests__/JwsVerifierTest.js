import JwsVerifier from '../util/JwsVerifier';
import { readJsonFile } from '../util/TestHelpers';

const jwks = readJsonFile(__dirname + '/resources/jwks.json');
const jwk = jwks.keys.find((jwk) => {
  return jwk.kid === 'sample-idtoken-key';
});

const rsaJws = 'eyJraWQiOiJzYW1wbGUtaWR0b2tlbi1rZXkiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiLWJOcjRqbFpqc2E1SHpkWWg4N2NWUSIsImFjciI6IkRlZmF1bHQiLCJzdWIiOiJVc2Vyc1wvYmIyNGRhNTktNmE5MS00YzQxLTlhYjctZjRmM2ExNDc5MGI0IiwiYXVkIjoicmVhY3Qtc2lnbi1pbi1zYW1wbGUiLCJhbXIiOlsicHdkIl0sImF1dGhfdGltZSI6MTQ4NDY3NzQxMiwiaXNzIjoiaHR0cHM6XC9cL2V4YW1wbGUuY29tIiwiZXhwIjoxNDg0Njc4MzE1LCJpYXQiOjE0ODQ2Nzc0MTUsIm5vbmNlIjoiTk9OQ0UifQ.Te6G2x2XXI-iaE2DDfoAdIegirUR67RpWpRcZMuVAQQgvoNX2tm9rlNE3PFi7HSiS25wTl5jtT9suMHgCuWmkE1R6Pia7YgKvKQWWKHslzjl6qVt_2R_buv2ys-4bNIH5hefzi0alsvIJtLSbt-VZMXDUR_jZbuMnK2rgs_codM-PbIo_b2-C4zcxkpJUMV-8Cmk3IrmhhL_k4UEdKKO78lrgpSNXp5cGCkOrVUxOggQto5hzUgNwJUbYtu6PRo-S-bi6tU6v11iP3d826Fr4jlQAQ304gFFVWK9eVdzDcW62DB0YgcSgH1zX1loTVwIf4AEh0nVeTjHn07rPtNz_Q';

const hmacJws = 'eyJhbGciOiJIUzI1NiJ9.eyJhdF9oYXNoIjoiLW5QVC13SW9tUkpibUd1ckk2RWxDZyIsImFjciI6IkRlZmF1bHQiLCJzdWIiOiJVc2Vyc1wvYmIyNGRhNTktNmE5MS00YzQxLTlhYjctZjRmM2ExNDc5MGI0IiwiYXVkIjoiQG15LWFjY291bnRAIiwiYW1yIjpbInB3ZCJdLCJhdXRoX3RpbWUiOjE0ODQ2Nzc0MTIsImlzcyI6Imh0dHBzOlwvXC9leGFtcGxlLmNvbSIsImV4cCI6MTQ4NDY5Nzc4NywiaWF0IjoxNDg0Njk2ODg3LCJub25jZSI6Ik5PTkNFIn0.az1svYiXeIpYbF0bIrppPFMf8GYAsvOrxMAHXPTUNIM';

const invalidJwt = 'nope.no.good';

// The verifier will check time-based claims (e.g., nbf, iat, exp)
// against the current time if a 'verifyAt' field is not provided.
// To circumvent this, we can provide a large grace period.
const gracePeriod = Math.floor(new Date() / 1000);

describe('The JWS verifier', () => {
  it('can verify a valid JWS', () => {
    const jwsVerifier = new JwsVerifier(gracePeriod);
    expect(() => {
      jwsVerifier.verify(rsaJws, jwk, { alg: [ 'RS256' ], gracePeriod: gracePeriod });
    }).not.toThrow();
    expect(() => {
      jwsVerifier.verify(rsaJws, jwk, {
        alg: [ 'RS256' ],
        iss: 'https://example.com',
        aud: 'react-sign-in-sample',
        nonce: 'NONCE'
      });
    }).not.toThrow();
  });

  it('rejects a JWS with a mismatched nonce', () => {
    const jwsVerifier = new JwsVerifier(gracePeriod);
    expect(() => {
      jwsVerifier.verify(rsaJws, jwk, {
        alg: [ 'RS256' ],
        iss: 'https://example.com',
        aud: 'react-sign-in-sample',
        nonce: 'WRONG'
      });
    }).toThrow();
  });

  it('rejects a JWS with a mismatched aud claim', () => {
    const jwsVerifier = new JwsVerifier(gracePeriod);
    expect(() => {
      jwsVerifier.verify(rsaJws, jwk, {
        alg: [ 'RS256' ],
        iss: 'https://example.com',
        aud: 'WRONG'
      });
    }).toThrow();
  });

  it('rejects a JWS with a mismatched iss claim', () => {
    const jwsVerifier = new JwsVerifier(gracePeriod);
    expect(() => {
      jwsVerifier.verify(rsaJws, jwk, {
        alg: [ 'RS256' ],
        iss: 'https://wrong.com'
      });
    }).toThrow();
  });

  it('rejects an HMAC-signed JWS', () => {
    const jwsVerifier = new JwsVerifier(gracePeriod);
    expect(() => {
      jwsVerifier.verify(hmacJws, jwk, { alg: [ 'HS256' ], gracePeriod: gracePeriod });
    }).toThrow();
    expect(() => {
      jwsVerifier.verify(hmacJws, jwk, { gracePeriod: gracePeriod });
    }).toThrow();
  });

  it ('rejects a completely invalid JWT', () => {
    const jwsVerifier = new JwsVerifier(gracePeriod);
    expect(() => {
      jwsVerifier.verify(invalidJwt, jwk);
    }).toThrow();
  });
});
