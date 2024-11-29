import { Router } from "express";
import { EstudianteClaseController } from "../controllers/EstudianteClaseController";

const estudianteClaseController = new EstudianteClaseController();
const router = Router();

router.get("/", (req, res, next) => estudianteClaseController.getAllEstudiantesClase(req, res, next));
router.post("/", (req, res, next) => estudianteClaseController.addEstudianteToClase(req, res, next));
router.get("/:id_clase/:id_estudiante", (req, res, next) => estudianteClaseController.getEstudianteClaseById(req, res, next));
router.put("/:id_clase/:id_estudiante", (req, res, next) => estudianteClaseController.updateEstudianteClase(req, res, next));
router.delete("/:id_clase/:id_estudiante", (req, res, next) =>
    estudianteClaseController.removeEstudianteFromClase(req, res, next)
);
export default router;
