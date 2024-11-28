import express from "express";
import cors from "cors";
import "dotenv/config";

import AppDataSource from "./config/database";
import estudianteRoutes from "./modules/estudiantes/routes/estudiante.routes";
import claseRoutes from "./modules/clases/routes/clase.routes";
import tareaRoutes from "./modules/tareas/routes/tarea.routes";
import grupoRoutes from "./modules/grupos/routes/grupo.routes";
import responsabilidadRoutes from "./modules/responsabilidades/routes/responsabilidad.routes";
import comentarioRoutes from "./modules/comentarios/routes/comentario.routes";
import profesorRoutes from "./modules/profesores/routes/profesor.routes";
import estudianteClaseRoutes from "./modules/estudiantes_clases/routes/estudianteClase.routes";
import estudianteClaseGrupoRoutes from "./modules/estudiantes_clases_grupos/routes/estudianteClaseGrupo.routes";

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware para manejar JSON
app.use(express.json());

// Configura CORS
app.use(
  cors({
    origin: "http://localhost:5173", // URL del frontend (ajústalo según sea necesario)
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  })
);

// Rutas de las entidades (módulos)
app.use("/api/estudiantes", estudianteRoutes);
app.use("/api/clases", claseRoutes);
app.use("/api/tareas", tareaRoutes);
app.use("/api/grupos", grupoRoutes);
app.use("/api/responsabilidades", responsabilidadRoutes);
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/profesores", profesorRoutes);
app.use("/api/estudiantes_clases", estudianteClaseRoutes);
app.use("/api/estudiantes_clases_grupo", estudianteClaseGrupoRoutes);

// Probar conexión con la base de datos y levantar el servidor
(async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database connected successfully.");
    }
  } catch (error) {
    console.error("Error initializing data source:", error);
  }
})();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
