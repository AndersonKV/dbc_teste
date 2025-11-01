import { Router } from "express";
import { ToDoController } from "../controllers/ToDoController";
import { UserController } from "../controllers/UserController";
import { authenticateToken } from "../middlewares/auth";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post("/todos", authenticateToken, ToDoController.create);
router.get("/todos", authenticateToken, ToDoController.findAll);
router.get(
  "/todos/title/:title",
  authenticateToken,
  ToDoController.findByTitle
);
router.get(
  "/todos/description/:desc",
  authenticateToken,
  ToDoController.findByDescription
);
router.put("/todos/:id", authenticateToken, ToDoController.update);
router.delete("/todos/:id", authenticateToken, ToDoController.delete);
router.get(
  "/todos/filter/pending",
  authenticateToken,
  ToDoController.filterPending
);
router.get(
  "/todos/filter/completed",
  authenticateToken,
  ToDoController.filterCompleted
);

router.post("/users", UserController.create);
router.get("/users", UserController.findAll);

router.post("/auth", AuthController.login);

export default router;
