import { Router } from "express";
import { GrupoController } from "../controllers/GrupoController";
import { validateGrupoMiddleware } from "../../../middlewares/validateGrupoMiddleware";

const router = Router();
const grupoController = new GrupoController();

router.get("/", (req, res, next) => grupoController.getAllGrupos(req, res, next));
router.get("/:id_grupo/tarea/:id_tarea", (req, res, next) =>
    grupoController.getGrupoByIdAndTarea(req, res, next)
);

// Middleware para validar antes de crear o actualizar grupos
router.post("/", validateGrupoMiddleware, (req, res, next) =>
    grupoController.createGrupo(req, res, next)
);
router.put("/:id", validateGrupoMiddleware, (req, res, next) =>
    grupoController.updateGrupo(req, res, next)
);
router.delete("/:id", (req, res, next) => grupoController.deleteGrupo(req, res, next));

router.put("/:id_grupo/lider", (req, res, next) => grupoController.assignLider(req, res, next));

router.get("/:id_grupo/estudiantes", grupoController.getEstudiantesByGrupoId.bind(grupoController));

router.get("/clase/:id_clase/tarea/:id_tarea", grupoController.getGruposByClaseAndTarea.bind(grupoController));

export default router;
