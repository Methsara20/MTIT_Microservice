const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

/**
 * Helper function for cleaner proxy setup
 */
const createServiceProxy = (route, target, rewritePath) => {
    return createProxyMiddleware({
        target: target,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: rewritePath
        }
    });
};

// ================= ROUTES =================

// Patient Service
app.use('/api/patients', createServiceProxy(
    '/api/patients',
    'http://localhost:3001',
    '/patients'
));

// Doctor Service
app.use('/api/doctors', createServiceProxy(
    '/api/doctors',
    'http://localhost:3002',
    '/doctors'
));

// Appointment Service
app.use('/api/appointments', createServiceProxy(
    '/api/appointments',
    'http://localhost:3003',
    '/appointments'
));

// Pharmacy Service
app.use('/api/medicines', createServiceProxy(
    '/api/medicines',
    'http://localhost:3004',
    '/medicines'
));

// Billing Service
app.use('/api/invoices', createServiceProxy(
    '/api/invoices',
    'http://localhost:3005',
    '/invoices'
));

// Lab Service
app.use('/api/tests', createServiceProxy(
    '/api/tests',
    'http://localhost:3006',
    '/tests'
));

// Root check
app.get('/', (req, res) => {
    res.json({ message: "API Gateway Running 🚀" });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});