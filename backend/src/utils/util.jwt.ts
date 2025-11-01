import jwt, { SignOptions, Secret } from "jsonwebtoken";

const SECRET_KEY: Secret = "sua_chave_super_secreta_123!";

export function generateToken(payload: object) {
  const options: SignOptions = { expiresIn: "1h" };
  return jwt.sign(payload, SECRET_KEY, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}
