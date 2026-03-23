const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const appointmentRoutes = require('./routes/AppointmentRoutes');
const swaggerSpec = require('./swagger/swagger');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/appointments', appointmentRoutes);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Appointment Service running on http://localhost:${PORT}`);
});