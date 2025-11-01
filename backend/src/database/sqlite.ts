import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Função para abrir a conexão com o banco
export async function openDB() {
  return open({
    filename: "./todos.db", // arquivo SQLite
    driver: sqlite3.Database,
  });
}
