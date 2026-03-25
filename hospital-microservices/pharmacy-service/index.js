const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const medicineRoutes = require('./routes/medicineRoutes');
const swaggerSpec = require('./swagger/swagger');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/pharmacy/medicines', medicineRoutes);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3004;

app.listen(PORT, () => {
    console.log(`Pharmacy Service running on http://localhost:${PORT}`);
});
