import { Request, Response } from "express";
import { openDB } from "../database/sqlite";
import { CreateUserDTO } from "../dto/user.dto";
import { User } from "../models/User";
import { isValidEmail } from "../utils/util.email";
import bcrypt from "bcrypt";

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const data: CreateUserDTO = req.body;

      if (!data.name || !data.email || !data.password) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      if (!isValidEmail(data.email)) {
        return res.status(400).json({ error: "Email inválido" });
      }

      const db = await openDB();

      const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [
        data.email,
      ]);
      if (existingUser) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const result = await db.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [data.name, data.email, hashedPassword]
      );

      const user: User = {
        id: result.lastID,
        name: data.name,
        email: data.email,
        password: hashedPassword,
      };

      res.status(201).json(user);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const db = await openDB();
      const users: User[] = await db.all("SELECT id, name, email FROM users");
      res.json(users);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
