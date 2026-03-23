const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Patient Service API",
            version: "1.0.0",
            description: "API for managing patients"
        },
        servers: [
            {
                url: "http://localhost:3001"
            }
        ]
    },
    apis: ["./routes/*.js", "./routes/*.js"],
};

module.exports = swaggerJSDoc(options);