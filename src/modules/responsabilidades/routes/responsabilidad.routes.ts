import { Router } from "express";
import { ResponsabilidadController } from "../controllers/ResponsabilidadController";

const router = Router();
const responsabilidadController = new ResponsabilidadController();

router.get("/", (req, res) => responsabilidadController.getAllResponsabilidades(req, res));
router.post("/", (req, res) => responsabilidadController.createResponsabilidad(req, res));
router.put("/:id_responsabilidad", (req, res) =>
    responsabilidadController.updateResponsabilidad(req, res)
);
router.delete("/:id_responsabilidad", (req, res) =>
    responsabilidadController.deleteResponsabilidad(req, res)
);

export default router;
