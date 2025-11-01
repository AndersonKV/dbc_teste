import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/util.jwt";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch (err) {
    console.error("Erro de autenticação:", err);
    res.status(403).json({ error: "Token inválido" });
  }
}
