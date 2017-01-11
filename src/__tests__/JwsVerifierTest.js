import JwsVerifier from '../util/JwsVerifier';

const jwk = JSON.parse(`{"kty":"RSA","use":"sig","kid":"rsa-idtoken","n":"ALeGdWfL/eyQOloX3qoS86GYTLcCjpPMQg+n8ETfRcQqEBhXq6i1i1vbA9cDHtqaPDBdkMv5LOQutZVSmnskfwwPxCfoJsHIkLlQhItpkU2aE00P5MH1mABPD1sEOlXN9UV2RKpOXKPtz/HL0F01+pS9l7/e0bupQ95tTbCFM2rZETkbTRijOPMYyBSEFyX73iPFuvscanm/swB9GXYs6wJnsW/EbriwnM+0xkO9BwAJ13lZ02f0cY29/UNGdXAth/BkslDQ958uFx+HFSH0akQ6OUcIkP7d5bDfNZr+ME0fxbSiqIEw/F5/TXtUoQ1kGaq+uje8ZfqM2INBfsRoXfM=","e":"AQAB","x5c":["MIIDIzCCAgugAwIBAgIEZfkOyTANBgkqhkiG9w0BAQsFADBCMR8wHQYDVQQKExZQaW5nIElkZW50aXR5IEtleSBQYWlyMR8wHQYDVQQDExZEYXRhIEdvdmVybmFuY2UgQnJva2VyMB4XDTE2MTExNjE3MTY0MloXDTM2MTExMTE3MTY0MlowQjEfMB0GA1UEChMWUGluZyBJZGVudGl0eSBLZXkgUGFpcjEfMB0GA1UEAxMWRGF0YSBHb3Zlcm5hbmNlIEJyb2tlcjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALeGdWfL/eyQOloX3qoS86GYTLcCjpPMQg+n8ETfRcQqEBhXq6i1i1vbA9cDHtqaPDBdkMv5LOQutZVSmnskfwwPxCfoJsHIkLlQhItpkU2aE00P5MH1mABPD1sEOlXN9UV2RKpOXKPtz/HL0F01+pS9l7/e0bupQ95tTbCFM2rZETkbTRijOPMYyBSEFyX73iPFuvscanm/swB9GXYs6wJnsW/EbriwnM+0xkO9BwAJ13lZ02f0cY29/UNGdXAth/BkslDQ958uFx+HFSH0akQ6OUcIkP7d5bDfNZr+ME0fxbSiqIEw/F5/TXtUoQ1kGaq+uje8ZfqM2INBfsRoXfMCAwEAAaMhMB8wHQYDVR0OBBYEFPSM5kJzN6Wtypf97HiNCLmcOIQSMA0GCSqGSIb3DQEBCwUAA4IBAQA+rR4t9BOQ8xDw1jk7UdxRZpNmoUgry6NGlWT6TkAcElhri7rZNh8XjgM5HQOmgqm+nxtQNRmWLmR2fLKF67CoFZNW1cAxr9eUoAtdxLoWKjwa2xoLcHoPEhscuSPOj303hbklZk9X+DNA9axR1PII5QljS+hE8h6LfVsdVeQZ25BSpG12t5Au9irp87DYVtqWOb0b159A2OL6ks/l+XZe2oOL9tn0PULilZ3dkdPUfTgMStA/pD+OEti+v4WEql45zyxDwwHy7QZPclm31OAhad/gTS+9vluUiEO5O15cUHpvwVwKekmBEHu8u35ClXb0hKsL/K2JzzfOMDTZ7KH7"]}`);

const rsaJws = 'eyJraWQiOiJyc2EtaWR0b2tlbiIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiSnFObWhDWEFBZ3VRZjMtX2dsSmdLZyIsImFjciI6IkRlZmF1bHQiLCJzdWIiOiJVc2Vyc1wvYTFmZTJlMmEtNGI5Zi00MjRjLWI1ZDYtNDY3ZDQ4NmNlMDFjIiwiYXVkIjoiYnJva2VyLXJlYWN0LXNpZ24taW4tc2FtcGxlIiwiYW1yIjpbInB3ZCJdLCJhdXRoX3RpbWUiOjE0ODQxNjYxMjEsImlzcyI6Imh0dHBzOlwvXC92bS1zbWFsbC0zNC51bmJvdW5kaWQubGFiIiwiZXhwIjoxNDg0MTY3MDIzLCJpYXQiOjE0ODQxNjYxMjMsIm5vbmNlIjoiM2YyOGNiZGUtMjI0ZS00NDZjLTlhZGEtYjgzMjFlYTA5YzA1In0.PMba11K97VuIAlL5TEDRHLpx5rltmcfJ2Tz1XhGK2lEJYfCTPCL9uANw-yo6wAoYvY7kZJZ7sPzFGac3f4rdy_62MHtwlIGe5alXjMQV1K48mi3xHryusk_AGj8mv0DFPlLDv9uKZGWrkl0SenzTDwzDz_95abDVzZhKFoWOEbB76R0NCqFcNno_v6EOqTUGqPnVHOauURRVzQOEkHE1sJlbQNSa5FHp-X-PantoT9bx6oGy854dbulF20_-XpOeukdMN0Onudb4yTAYaau_D5t5jP8vWxrJNoMk93OUSwSSwyM5HpFH9FG0G4pZlHETo7gzHjJKun3gmGLlpkmh9w';

const hmacJws = 'eyJhbGciOiJIUzI1NiJ9.eyJhdF9oYXNoIjoiaUJlWnhSUnM3WnlDQzE5aHZ5YTJHQSIsImFjciI6IkRlZmF1bHQiLCJzdWIiOiJVc2Vyc1wvYTFmZTJlMmEtNGI5Zi00MjRjLWI1ZDYtNDY3ZDQ4NmNlMDFjIiwiYXVkIjoiQG15LWFjY291bnRAIiwiYW1yIjpbInB3ZCJdLCJhdXRoX3RpbWUiOjE0ODQxNjYxMjEsImlzcyI6Imh0dHBzOlwvXC92bS1zbWFsbC0zNC51bmJvdW5kaWQubGFiIiwiZXhwIjoxNDg0MTY3NjE5LCJpYXQiOjE0ODQxNjY3MTksIm5vbmNlIjoiYXNkZmFkc2YifQ.567eLnTySEGV5qhqSkXtFZLqOGpUUlbMBEBStzpoHvQ';

const invalidJwt = 'nope.no.good';

// The verifier will check time-based claims (e.g., nbf, iat, exp)
// against the current time if a 'verifyAt' field is not provided.
// To circumvent this, we can provide a large grace period.
const gracePeriod = Math.floor(new Date() / 1000);

describe('The JWS verifier', () => {
  it('can verify a valid JWS', () => {
    expect(JwsVerifier.verify(rsaJws, jwk, { alg: [ 'RS256' ], gracePeriod: gracePeriod})).toBeTruthy();
  });

  it('rejects an HMAC-signed JWS', () => {
    expect(() => {
      JwsVerifier.verify(hmacJws, jwk, { alg: [ 'HS256' ], gracePeriod: gracePeriod })
    }).toThrow();
    expect(JwsVerifier.verify(hmacJws, jwk, { gracePeriod: gracePeriod })).toBeFalsy();
  });

  it ('rejects a completely invalid JWT', () => {
    expect(() => {
      JwsVerifier.verify(invalidJwt, jwk);
    }).toThrow();
  });
});
