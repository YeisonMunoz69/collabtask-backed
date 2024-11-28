import { Router } from "express";
import { ComentarioController } from "../controllers/ComentarioController";

const router = Router();
const comentarioController = new ComentarioController();

router.get("/:id_grupo", (req, res, next) => comentarioController.getComentariosByGrupo(req, res, next));
router.post("/", (req, res, next) => comentarioController.createComentario(req, res, next));
router.delete("/:id_comentario", (req, res, next) => comentarioController.deleteComentario(req, res, next));

export default router;
