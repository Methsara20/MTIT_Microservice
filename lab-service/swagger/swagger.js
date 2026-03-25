const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lab Service API',
      version: '1.0.0',
      description: 'Hospital Management System - Lab Service API Documentation'
    },
    servers: [
      {
        url: 'http://localhost:3006',
        description: 'Direct access'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at http://localhost:3006/api-docs');
};

module.exports = swaggerDocs;