const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Doctor Service API",
            version: "1.0.0",
            description: "API for managing doctors"
        },
        servers: [
            {
                url: "http://localhost:3002"
            }
        ]
    },
    apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);