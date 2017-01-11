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
      claims.alg.map((alg) => {
        if (!alg.toLowerCase().startsWith('rs')) {
          throw new Error('Only RSA-based JWAs are supported');
        }
        return null;
      })
    }
    if (!KJUR.jws.JWS.verifyJWT(jwt, JwsVerifier._jwkToPublicKey(jwk), claims)) {
      throw new Error("ID token validation failed");
    }
  }
}

export default JwsVerifier;