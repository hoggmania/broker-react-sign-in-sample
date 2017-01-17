import { KJUR, KEYUTIL } from 'jsrsasign';
import { OIDC } from '../Config';

// This utility class verifies signed JWT (JWS) tokens, with the
// following caveats:
//
// 1. Encrypted JWT (JWE) tokens are not supported.
// 2. Only RSA-based signing algorithms (JWAs) are supported.
//

class JwsVerifier {
  constructor(gracePeriod = OIDC.gracePeriod) {
    this.gracePeriod = gracePeriod;
    this.verify = this.verify.bind(this);
  }

  static _jwkToPublicKey(jwk) {
    if (jwk.x5c && jwk.x5c.length > 0) {
      const key = jwk.x5c[0];
      const begin = '-----BEGIN CERTIFICATE-----';
      const end = '-----END CERTIFICATE-----';
      return KEYUTIL.getKey(begin + key + end);
    } else {
      throw new Error("No 'x5c' claim in JWK");
    }
  }

  verify(jwt, jwk, expectedClaims) {
    let claims = {
      alg: [ 'RS256' ],
      gracePeriod: this.gracePeriod
    };
    Object.assign(claims, expectedClaims);

    if (claims.alg) {
      claims.alg.forEach((alg) => {
        if (!alg.toLowerCase().startsWith('rs')) {
          throw new Error('Only RSA-based JWAs are supported');
        }
      })
    }
    // The jsrsasign library will check some claims for us, but we'll
    // have better error messaging if we check some manually.
    const parsedJwt = KJUR.jws.JWS.parse(jwt);
    const actualClaims = parsedJwt.payloadObj;
    if (claims.nonce) {
      if (actualClaims.nonce !== claims.nonce) {
        throw new Error("nonce claim does not match");
      }
      delete claims.nonce;
    }
    if (claims.iss) {
      if (actualClaims.iss !== claims.iss) {
        throw new Error(`iss claim '${actualClaims.iss}' does not match expected claim '${claims.iss}'`);
      }
      delete claims.iss;
    }
    if (claims.aud) {
      if (parsedJwt.payloadObj.aud !== claims.aud) {
        throw new Error(`aud claim '${actualClaims.aud}' does not match expected claim '${claims.aud}'`);
      }
      delete claims.aud;
    }
    // Verify signature. The jsrsasign library will also check the
    // following claims: alg, jti, nbf, iat, exp
    if (!KJUR.jws.JWS.verifyJWT(jwt, JwsVerifier._jwkToPublicKey(jwk), claims)) {
      throw new Error("ID token validation failed");
    }
    return actualClaims;
  }
}

export default JwsVerifier;