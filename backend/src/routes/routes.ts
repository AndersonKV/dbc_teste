import { Router } from "express";
import { ToDoController } from "../controllers/ToDoController";

const router = Router();

// CRUD e filtros
router.post("/todos", ToDoController.create);
router.get("/todos", ToDoController.findAll);
router.get("/todos/title/:title", ToDoController.findByTitle);
router.get("/todos/description/:desc", ToDoController.findByDescription);
router.put("/todos/:id", ToDoController.update);
router.delete("/todos/:id", ToDoController.delete);
router.get("/todos/filter/pending", ToDoController.filterPending);
router.get("/todos/filter/completed", ToDoController.filterCompleted);

export default router;
