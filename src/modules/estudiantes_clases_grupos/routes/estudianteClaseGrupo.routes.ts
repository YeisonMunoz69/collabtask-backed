import { Router } from "express";
import { EstudianteClaseGrupoController } from "../controllers/EstudianteClaseGrupoController";

const estudianteClaseGrupoController = new EstudianteClaseGrupoController();
const router = Router();

router.get("/", estudianteClaseGrupoController.getAllEstudiantesClaseGrupo.bind(estudianteClaseGrupoController));
router.post("/", estudianteClaseGrupoController.createEstudianteClaseGrupo.bind(estudianteClaseGrupoController));
router.delete("/:id_grupo/:id_estudiante", (req, res, next) =>
    estudianteClaseGrupoController.deleteEstudianteClaseGrupo(req, res, next)
);

export default router;
