// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API documentation for the E-commerce application',
    },
  },
  // Dùng một mảng chứa đường dẫn của tất cả các tệp định tuyến
  apis: ['./src/routes/userRoutes.js', './src/routes/productRoutes.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
