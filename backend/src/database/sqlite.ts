import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Função para abrir a conexão com o banco e inicializar tabelas
export async function openDB(): Promise<Database> {
  const db = await open({
    filename: "./todos.db",
    driver: sqlite3.Database,
  });

  await db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      completed INTEGER DEFAULT 0
    )
  `);

  // Cria tabela de usuários se não existir
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  return db;
}
