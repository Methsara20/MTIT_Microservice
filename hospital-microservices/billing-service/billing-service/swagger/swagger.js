const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Billing Service API",
      version: "1.0.0",
      description: "API for managing billing invoices"
    },
    servers: [
      {
        url: "http://localhost:3005"
      }
    ]
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);