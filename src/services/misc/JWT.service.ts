import jwt from 'jsonwebtoken';

export default {
  signJWT: (payload: string | object | Buffer) => {
    const { JWT_KEY } = process.env;
    return jwt.sign(payload, JWT_KEY);
  },
};
