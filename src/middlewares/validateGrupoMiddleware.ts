import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar el formato de JSON al crear o actualizar grupos.
 */
export const validateGrupoMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { id_tarea, capacidad } = req.body;

    // Validar que id_tarea exista y sea un número
    if (!id_tarea || typeof id_tarea !== "number") {
        res.status(400).json({
            message: "El campo 'id_tarea' es requerido y debe ser un número",
        });
        return;
    }

    // Validar que capacidad sea un número positivo
    if (typeof capacidad !== "number" || capacidad <= 0) {
        res.status(400).json({
            message: "El campo 'capacidad' es requerido y debe ser un número mayor a 0",
        });
        return;
    }

    next(); // Pasar al siguiente middleware o controlador
};
