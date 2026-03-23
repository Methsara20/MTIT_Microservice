const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const patientRoutes = require('./routes/patientRoutes');
const swaggerSpec = require('./swagger/swagger');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/patients', patientRoutes);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Patient Service running on http://localhost:${PORT}`);
});