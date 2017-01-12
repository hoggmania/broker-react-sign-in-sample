import { KJUR, KEYUTIL } from 'jsrsasign';

// This utility class verifies signed JWT (JWS) tokens, with the
// following caveats:
//
// 1. Encrypted JWT (JWE) tokens are not supported.
// 2. Only RSA-based signing algorithms (JWAs) are supported.
//

class JwsVerifier {
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

  static verify(jwt, jwk, expectedClaims) {
    let claims = {
      alg: [ 'RS256' ]
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
    let parsedJwt = KJUR.jws.JWS.parse(jwt);
    if (claims.nonce) {
      if (parsedJwt.payloadObj.nonce !== claims.nonce) {
        throw new Error("nonce claim does not match");
      }
      delete claims.nonce;
    }
    if (claims.iss) {
      if (parsedJwt.payloadObj.iss !== claims.iss) {
        throw new Error("iss claim does not match");
      }
      delete claims.iss;
    }
    if (claims.aud) {
      if (parsedJwt.payloadObj.aud !== claims.aud) {
        throw new Error("aud claim does not match");
      }
      delete claims.aud;
    }
    // Verify signature. The jsrsasign library will also check the
    // following claims: alg, jti, nbf, iat, exp
    if (!KJUR.jws.JWS.verifyJWT(jwt, JwsVerifier._jwkToPublicKey(jwk), claims)) {
      throw new Error("ID token validation failed");
    }
    return parsedJwt.payloadObj;
  }
}

export default JwsVerifier;