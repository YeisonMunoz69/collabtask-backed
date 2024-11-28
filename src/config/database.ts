import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "collabtask",
    synchronize: false, // Usar "true" solo durante el desarrollo inicial para sincronizar tablas automáticamente
    logging: true, // Habilitar para ver las consultas SQL en consola
    entities: ["dist/modules/**/entities/*.js"], // Ruta donde estarán las entidades compiladas
    migrations: ["dist/migrations/*.js"], // Ruta para las migraciones compiladas
    subscribers: ["dist/modules/**/subscribers/*.js"] // Ruta para los observadores compilados
});

export default AppDataSource;