"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const database_1 = __importDefault(require("./config/database"));
const estudiante_routes_1 = __importDefault(require("./modules/estudiantes/routes/estudiante.routes"));
const clase_routes_1 = __importDefault(require("./modules/clases/routes/clase.routes"));
const tarea_routes_1 = __importDefault(require("./modules/tareas/routes/tarea.routes"));
const grupo_routes_1 = __importDefault(require("./modules/grupos/routes/grupo.routes"));
const responsabilidad_routes_1 = __importDefault(require("./modules/responsabilidades/routes/responsabilidad.routes"));
const comentario_routes_1 = __importDefault(require("./modules/comentarios/routes/comentario.routes"));
const profesor_routes_1 = __importDefault(require("./modules/profesores/routes/profesor.routes"));
const estudianteClase_routes_1 = __importDefault(require("./modules/estudiantes_clases/routes/estudianteClase.routes"));
const estudianteClaseGrupo_routes_1 = __importDefault(require("./modules/estudiantes_clases_grupos/routes/estudianteClaseGrupo.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3010;
// Middleware para manejar JSON
app.use(express_1.default.json());
// Configura CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // URL del frontend (ajústalo según sea necesario)
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
}));
// Rutas de las entidades (módulos)
app.use("/api/estudiantes", estudiante_routes_1.default);
app.use("/api/clases", clase_routes_1.default);
app.use("/api/tareas", tarea_routes_1.default);
app.use("/api/grupos", grupo_routes_1.default);
app.use("/api/responsabilidades", responsabilidad_routes_1.default);
app.use("/api/comentarios", comentario_routes_1.default);
app.use("/api/profesores", profesor_routes_1.default);
app.use("/api/estudiantes_clases", estudianteClase_routes_1.default);
app.use("/api/estudiantes_clases_grupo", estudianteClaseGrupo_routes_1.default);
// Probar conexión con la base de datos y levantar el servidor
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!database_1.default.isInitialized) {
            yield database_1.default.initialize();
            console.log("Database connected successfully.");
        }
    }
    catch (error) {
        console.error("Error initializing data source:", error);
    }
}))();
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
exports.default = app;
