const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const billingRoutes = require('./routes/BillingRoutes');
const swaggerSpec = require('./swagger/swagger');

const app = express();

app.use(cors());
app.use(express.json());

// Root test
app.get('/', (req, res) => {
  res.send("Billing Service is running 🚀");
});

// Routes
app.use('/billing/invoices', billingRoutes);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Billing Service running on http://localhost:${PORT}/billing/invoices`);
  console.log(`Swagger UI: http://localhost:${PORT}/docs`);
});