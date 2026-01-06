import swaggerIds from "swagger-jsdoc";
import { env } from "./env";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DeVinci360 API",
            version: "1.0.0",
            description: "API Documentation for DeVinci360 Backend",
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}/api/v1`,
                description: "Development Server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/modules/**/*.routes.ts"],
};

export const swaggerSpec = swaggerIds(options);
