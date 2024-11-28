import { Router } from "express";
import { EstudianteController } from "../controllers/EstudianteController";

const estudianteController = new EstudianteController();
const router = Router();

router.get("/", estudianteController.getAllEstudiantes.bind(estudianteController));
router.post("/", estudianteController.createEstudiante.bind(estudianteController));
router.get("/:id", estudianteController.getEstudianteById.bind(estudianteController));
router.put("/:id", estudianteController.updateEstudiante.bind(estudianteController));
router.delete("/:id", estudianteController.deleteEstudiante.bind(estudianteController));

export default router;
