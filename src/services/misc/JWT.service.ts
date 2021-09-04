import jwt, { decode } from 'jsonwebtoken';

const { JWT_KEY } = process.env;

export default {
  signJWT: async (payload: string | object | Buffer) => {
    return jwt.sign(payload, JWT_KEY);
  },

  decodeJWT: async (token: string) => {
    try {
      const decodedToken = jwt.verify(token, JWT_KEY);
      return decodedToken as jwt.JwtPayload;
    } catch (err) {
      return null;
    }
  },
};
