const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Appointment Service API",
            version: "1.0.0",
            description: "API for managing appointments"
        },
        servers: [
            {
                url: "http://localhost:3003"
            }
        ]
    },
    apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);