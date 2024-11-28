import { Router } from "express";
import { ClaseController } from "../controllers/ClaseController";

const claseController = new ClaseController();
const router = Router();

router.get("/", (req, res, next) => claseController.getAllClases(req, res, next));
router.post("/", (req, res, next) => claseController.createClase(req, res, next));
router.get("/:id", (req, res, next) => claseController.getClaseById(req, res, next));
router.get("/profesor/:id_profesor", (req, res, next) => claseController.getClasesByProfesorId(req, res, next));
router.get("/codigo_profesor/:codigo_profesor", (req, res, next) => claseController.getClasesByCodigoProfesor(req, res, next));
router.put("/:id", (req, res, next) => claseController.updateClase(req, res, next));
router.delete("/:id", (req, res, next) => claseController.deleteClase(req, res, next));

export default router;