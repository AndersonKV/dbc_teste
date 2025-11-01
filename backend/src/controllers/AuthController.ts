import { Request, Response } from "express";
import { openDB } from "../database/sqlite";

import bcrypt from "bcrypt";
import { generateToken } from "../utils/util.jwt";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const db = await openDB();
      const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
      if (!user)
        return res.status(400).json({ error: "Usuário ou senha incorretos" });

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ error: "Usuário ou senha incorretos" });

      const token = generateToken({ id: user.id, email: user.email });

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token });
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
