import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar el formato de JSON al crear o actualizar clases.
 */
export const validateClaseMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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
