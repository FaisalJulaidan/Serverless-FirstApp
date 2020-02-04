import axios from 'axios';
import * as jwt from 'jsonwebtoken';

const jwkToPem = require('jwk-to-pem');

export const getPayload = async (token) => {
    try {
        const res = await axios.get(``);

        if (res.status === 200) {
            let pems = {};
            var keys = res.data['keys'];
            for (var i = 0; i < keys.length; i++) {
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent };
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            var decodedJwt = jwt.decode(token, { complete: true });
            if (!decodedJwt) {
                console.log('Not a valid JWT token');
                return;
            }
            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                return new Error('Invalid token');
            }
            try {
                const payload = await jwt.verify(token, pem);
                console.log('Valid Token.');
                return payload;
            } catch (err) {
                console.log('Invalid Token.');
                return new Error('Invalid token');
            }
        }
    } catch (error) {
        console.log('Error! Unable to download JWKs');
        return error;
    }
};
