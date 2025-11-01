import express from "express";
import cors from "cors";
import todoRoutes from "./routes/routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", todoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
