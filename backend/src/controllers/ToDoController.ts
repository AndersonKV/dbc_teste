import { Request, Response } from "express";
import { openDB } from "../database/sqlite";
import { ToDo } from "../models/Todo";
import { CreateToDoDTO, UpdateToDoDTO } from "../dto/todo.dto";

export class ToDoController {
  // Inicializa tabela
  static async initTable() {
    const db = await openDB();
    await db.run(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0
      )
    `);
  }

  static async create(req: Request, res: Response) {
    const data: CreateToDoDTO = req.body;
    if (!data.title)
      return res.status(400).json({ error: "Title is required" });

    const db = await openDB();
    const result = await db.run(
      "INSERT INTO todos (title, description) VALUES (?, ?)",
      [data.title, data.description || ""]
    );
    res.json({ id: result.lastID, ...data, completed: false });
  }

  static async findAll(req: Request, res: Response) {
    const db = await openDB();
    const todos: ToDo[] = await db.all("SELECT * FROM todos");
    res.json(todos);
  }

  static async findByTitle(req: Request, res: Response) {
    const db = await openDB();
    const todos: ToDo[] = await db.all(
      "SELECT * FROM todos WHERE title LIKE ?",
      [`%${req.params.title}%`]
    );
    res.json(todos);
  }

  static async findByDescription(req: Request, res: Response) {
    const db = await openDB();
    const todos: ToDo[] = await db.all(
      "SELECT * FROM todos WHERE description LIKE ?",
      [`%${req.params.desc}%`]
    );
    res.json(todos);
  }

  static async update(req: Request, res: Response) {
    const data: UpdateToDoDTO = req.body;
    const db = await openDB();
    await db.run(
      "UPDATE todos SET title = COALESCE(?, title), description = COALESCE(?, description), completed = COALESCE(?, completed) WHERE id = ?",
      [data.title, data.description, data.completed ? 1 : 0, req.params.id]
    );
    const todo = await db.get("SELECT * FROM todos WHERE id = ?", [
      req.params.id,
    ]);
    res.json(todo);
  }

  static async delete(req: Request, res: Response) {
    const db = await openDB();
    await db.run("DELETE FROM todos WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  }

  static async filterPending(req: Request, res: Response) {
    const db = await openDB();
    const todos: ToDo[] = await db.all(
      "SELECT * FROM todos WHERE completed = 0"
    );
    res.json(todos);
  }

  static async filterCompleted(req: Request, res: Response) {
    const db = await openDB();
    const todos: ToDo[] = await db.all(
      "SELECT * FROM todos WHERE completed = 1"
    );
    res.json(todos);
  }
}
