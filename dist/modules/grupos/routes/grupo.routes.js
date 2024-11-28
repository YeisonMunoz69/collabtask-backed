"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GrupoController_1 = require("../controllers/GrupoController");
const validateGrupoMiddleware_1 = require("../../../middlewares/validateGrupoMiddleware");
const router = (0, express_1.Router)();
const grupoController = new GrupoController_1.GrupoController();
router.get("/", (req, res, next) => grupoController.getAllGrupos(req, res, next));
router.get("/:id_grupo/tarea/:id_tarea", (req, res, next) => grupoController.getGrupoByIdAndTarea(req, res, next));
// Middleware para validar antes de crear o actualizar grupos
router.post("/", validateGrupoMiddleware_1.validateGrupoMiddleware, (req, res, next) => grupoController.createGrupo(req, res, next));
router.put("/:id", validateGrupoMiddleware_1.validateGrupoMiddleware, (req, res, next) => grupoController.updateGrupo(req, res, next));
router.delete("/:id", (req, res, next) => grupoController.deleteGrupo(req, res, next));
router.put("/:id_grupo/lider", (req, res, next) => grupoController.assignLider(req, res, next));
exports.default = router;
