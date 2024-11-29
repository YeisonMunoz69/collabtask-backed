import { Router } from "express";
import { TareaController } from "../controllers/TareaController";

const tareaController = new TareaController();
const router = Router();

router.get("/", tareaController.getAllTareas.bind(tareaController));
router.post("/", tareaController.createTarea.bind(tareaController));
router.get("/:id_tarea", (req, res, next) => tareaController.getTareaById(req, res, next));
router.delete("/:id", tareaController.deleteTarea.bind(tareaController));
router.get("/clase/:id_clase", tareaController.getTareasByClaseId.bind(tareaController));

export default router;
