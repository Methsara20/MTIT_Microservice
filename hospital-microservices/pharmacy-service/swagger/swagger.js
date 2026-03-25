const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Pharmacy Service API",
            version: "1.0.0",
            description: "API for managing medicine inventory in the pharmacy"
        },
        servers: [
            {
                url: "http://localhost:3004"
            }
        ]
    },
    apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);
