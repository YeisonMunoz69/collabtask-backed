import { Router } from "express";
import { ProfesorController } from "../controllers/ProfesorController";

const profesorController = new ProfesorController();
const router = Router();

router.get("/", profesorController.getAllProfesores.bind(profesorController));
router.post("/", profesorController.createProfesor.bind(profesorController));
router.get("/:id", profesorController.getProfesorById.bind(profesorController));
router.put("/:id", profesorController.updateProfesor.bind(profesorController));
router.delete("/:id", profesorController.deleteProfesor.bind(profesorController));

export default router;
