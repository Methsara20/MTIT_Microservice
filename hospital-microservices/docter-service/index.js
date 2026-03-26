const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const doctorRoutes = require('./routes/doctorRoutes');
const swaggerSpec = require('./swagger/swagger');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/doctors', doctorRoutes);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Doctor Service running on http://localhost:${PORT}`);
});