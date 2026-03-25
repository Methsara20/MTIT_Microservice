const express = require('express');
const cors = require('cors');
const labRoutes = require('./routes/labRoutes');
const swaggerDocs = require('./swagger/swagger');

const app = express();
const PORT = 3006;

app.use(cors());
app.use(express.json());

// Routes
app.use('/tests', labRoutes);

// Swagger
swaggerDocs(app);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Lab Service is running on port 3006' });
});

app.listen(PORT, () => {
  console.log(`Lab Service running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});