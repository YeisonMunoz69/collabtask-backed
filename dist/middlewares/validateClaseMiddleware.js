"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClaseMiddleware = void 0;
/**
 * Middleware para validar el formato de JSON al crear o actualizar clases.
 */
const validateClaseMiddleware = (req, res, next) => {
    const { profesor } = req.body;
    // Verificar que el campo profesor esté presente y contenga un ID válido
    if (!profesor || typeof profesor.id_profesor !== "number") {
        res.status(400).json({
            message: "El campo 'profesor.id_profesor' es requerido y debe ser un número",
        });
        return; // Esto asegura que no se continúe al controlador
    }
    next(); // Pasar al siguiente middleware o controlador
};
exports.validateClaseMiddleware = validateClaseMiddleware;
