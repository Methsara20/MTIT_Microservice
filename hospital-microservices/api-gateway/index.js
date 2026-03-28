// const express = require('express');
// const cors = require('cors');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();
// app.use(cors());

// /**
//  * Helper function for cleaner proxy setup
//  */
// const createServiceProxy = (route, target, rewritePath) => {
//     return createProxyMiddleware({
//         target: target,
//         changeOrigin: true,
//         pathRewrite: {
//             [`^${route}`]: rewritePath
//         }
//     });
// };

// // ================= ROUTES =================

// // Patient Service
// app.use('/api/patients', createServiceProxy(
//     '/api/patients',
//     'http://localhost:3001',
//     '/patients'
// ));

// // Doctor Service
// app.use('/api/doctors', createServiceProxy(
//     '/api/doctors',
//     'http://localhost:3002',
//     '/doctors'
// ));

// // Appointment Service
// app.use('/api/appointments', createServiceProxy(
//     '/api/appointments',
//     'http://localhost:3003',
//     '/appointments'
// ));

// // Pharmacy Service
// app.use('/api/pharmacy/medicines', createServiceProxy(
//     '/api/pharmacy/medicines',
//     'http:/localhost:3004',
//     '/pharmacy/medicines'
// ));

// // Billing Service
// app.use('/api/invoices', createServiceProxy(
//     '/api/invoices',
//     'http://localhost:3005',
//     'billing/invoices'
// ));

// // Lab Service
// app.use('/api/tests', createServiceProxy(
//     '/api/tests',
//     'http://localhost:3006',
//     '/tests'
// ));

// // Root check
// app.get('/', (req, res) => {
//     res.json({ message: "API Gateway Running 🚀" });
// });

// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`API Gateway running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// ─── Swagger Document ──────────────────────────────────────────────────────
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Hospital Management System — API Gateway',
    version: '1.0.0',
    description: 'All 6 microservices accessible through a single gateway on port 3000.',
  },
  servers: [{ url: 'http://localhost:3000', description: 'API Gateway' }],

  tags: [
    { name: 'Patients',     description: 'Patient Service → port 3001' },
    { name: 'Doctors',      description: 'Doctor Service → port 3002' },
    { name: 'Appointments', description: 'Appointment Service → port 3003' },
    { name: 'Pharmacy',     description: 'Pharmacy Service → port 3004' },
    { name: 'Billing',      description: 'Billing Service → port 3005' },
    { name: 'Lab',          description: 'Lab Service → port 3006' },
  ],

  components: {
    schemas: {
      Patient: {
        type: 'object',
        properties: {
          id:             { type: 'string',  example: 'P001' },
          name:           { type: 'string',  example: 'Kamal Perera' },
          age:            { type: 'integer', example: 45 },
          gender:         { type: 'string',  example: 'Male' },
          bloodType:      { type: 'string',  example: 'O+' },
          phone:          { type: 'string',  example: '0771234567' },
          address:        { type: 'string',  example: 'Kandy' },
          medicalHistory: { type: 'string',  example: 'Diabetes' },
        },
      },
      Doctor: {
        type: 'object',
        properties: {
          id:             { type: 'string', example: 'D001' },
          name:           { type: 'string', example: 'Dr. Nimal Perera' },
          specialization: { type: 'string', example: 'Cardiologist' },
          phone:          { type: 'string', example: '0771112233' },
          email:          { type: 'string', example: 'nimal.perera@hospital.lk' },
          availability:   { type: 'string', example: 'Mon - Fri (9:00 AM - 2:00 PM)' },
          department:     { type: 'string', example: 'Cardiology' },
        },
      },
      Appointment: {
        type: 'object',
        properties: {
          id:             { type: 'string', example: 'A001' },
          patientId:      { type: 'string', example: 'P001' },
          doctorName:     { type: 'string', example: 'Dr. Fernando' },
          specialization: { type: 'string', example: 'Cardiologist' },
          date:           { type: 'string', example: '2026-03-25' },
          time:           { type: 'string', example: '10:30 AM' },
          status:         { type: 'string', example: 'Scheduled' },
          notes:          { type: 'string', example: 'Regular checkup' },
        },
      },
      Medicine: {
        type: 'object',
        properties: {
          id:           { type: 'string',  example: 'M001' },
          medicineName: { type: 'string',  example: 'Paracetamol' },
          category:     { type: 'string',  example: 'Analgesic' },
          stock:        { type: 'integer', example: 500 },
          price:        { type: 'number',  example: 25.00 },
          manufacturer: { type: 'string',  example: 'CIC' },
          expiryDate:   { type: 'string',  example: '2027-06-30' },
        },
      },
      Invoice: {
        type: 'object',
        properties: {
          id:            { type: 'string', example: 'B001' },
          patientId:     { type: 'string', example: 'P001' },
          amount:        { type: 'number', example: 3500.00 },
          description:   { type: 'string', example: 'Cardiology consultation' },
          status:        { type: 'string', enum: ['pending', 'paid', 'overdue'], example: 'pending' },
          date:          { type: 'string', example: '2026-03-25' },
          paymentmethod: { type: 'string', example: 'card' },
        },
      },
      LabTest: {
        type: 'object',
        properties: {
          id:             { type: 'string', example: 'L001' },
          patientId:      { type: 'string', example: 'P001' },
          testName:       { type: 'string', example: 'Full Blood Count' },
          result:         { type: 'string', example: 'Normal' },
          status:         { type: 'string', enum: ['pending', 'processing', 'completed'], example: 'pending' },
          date:           { type: 'string', example: '2026-03-23' },
          technicianName: { type: 'string', example: 'Nimal Jayasinghe' },
        },
      },
    },
  },

  paths: {

    // ── Patients ─────────────────────────────────────────────────────────────
    '/api/patients': {
      get: {
        tags: ['Patients'], summary: 'Get all patients',
        responses: { 200: { description: 'List of all patients', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Patient' } } } } } },
      },
      post: {
        tags: ['Patients'], summary: 'Register a new patient',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Patient' }, example: { name: 'Amali Fernando', age: 35, gender: 'Female', bloodType: 'A+', phone: '0778899001', address: 'Negombo', medicalHistory: 'None' } } } },
        responses: { 201: { description: 'Patient registered successfully' } },
      },
    },
    '/api/patients/{id}': {
      get: {
        tags: ['Patients'], summary: 'Get patient by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'P001' }],
        responses: { 200: { description: 'Patient found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Patient' } } } }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Patients'], summary: 'Update patient',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'P001' }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Patient' }, example: { address: 'Colombo', medicalHistory: 'Diabetes' } } } },
        responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } },
      },
      delete: {
        tags: ['Patients'], summary: 'Delete patient',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'P001' }],
        responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } },
      },
    },

    // ── Doctors ──────────────────────────────────────────────────────────────
    '/api/doctors': {
      get: {
        tags: ['Doctors'], summary: 'Get all doctors',
        responses: { 200: { description: 'List of all doctors', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Doctor' } } } } } },
      },
      post: {
        tags: ['Doctors'], summary: 'Add a new doctor',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Doctor' }, example: { name: 'Dr. Malini Wijesinghe', specialization: 'Pediatrics', phone: '0715555666', email: 'malini@hospital.lk', availability: 'Mon-Fri', department: 'Pediatrics' } } } },
        responses: { 201: { description: 'Doctor added' } },
      },
    },
    '/api/doctors/{id}': {
      get: {
        tags: ['Doctors'], summary: 'Get doctor by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'D001' }],
        responses: { 200: { description: 'Doctor found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Doctor' } } } }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Doctors'], summary: 'Update doctor',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'D001' }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Doctor' }, example: { availability: 'Mon-Thu' } } } },
        responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } },
      },
      delete: {
        tags: ['Doctors'], summary: 'Delete doctor',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'D001' }],
        responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } },
      },
    },

    // ── Appointments ─────────────────────────────────────────────────────────
    '/api/appointments': {
      get: {
        tags: ['Appointments'], summary: 'Get all appointments',
        responses: { 200: { description: 'List of all appointments', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Appointment' } } } } } },
      },
      post: {
        tags: ['Appointments'], summary: 'Book a new appointment',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Appointment' }, example: { patientId: 'P001', doctorName: 'Dr. Fernando', specialization: 'Cardiologist', date: '2026-03-25', time: '10:30 AM', status: 'Scheduled', notes: 'Regular checkup' } } } },
        responses: { 201: { description: 'Appointment booked' } },
      },
    },
    '/api/appointments/{id}': {
      get: {
        tags: ['Appointments'], summary: 'Get appointment by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'A001' }],
        responses: { 200: { description: 'Appointment found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Appointment' } } } }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Appointments'], summary: 'Update appointment',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'A001' }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Appointment' }, example: { status: 'Completed', notes: 'Follow-up required' } } } },
        responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } },
      },
      delete: {
        tags: ['Appointments'], summary: 'Cancel appointment',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'A001' }],
        responses: { 200: { description: 'Cancelled' }, 404: { description: 'Not found' } },
      },
    },

    // ── Pharmacy ─────────────────────────────────────────────────────────────
    '/api/pharmacy/medicines': {
      get: {
        tags: ['Pharmacy'], summary: 'Get all medicines',
        responses: { 200: { description: 'List of all medicines', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Medicine' } } } } } },
      },
      post: {
        tags: ['Pharmacy'], summary: 'Add a new medicine',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Medicine' }, example: { medicineName: 'Omeprazole', category: 'Antacid', stock: 420, price: 35.00, manufacturer: 'Hemas', expiryDate: '2026-08-31' } } } },
        responses: { 201: { description: 'Medicine added' } },
      },
    },
    '/api/pharmacy/medicines/{id}': {
      get: {
        tags: ['Pharmacy'], summary: 'Get medicine by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'M001' }],
        responses: { 200: { description: 'Medicine found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Medicine' } } } }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Pharmacy'], summary: 'Update medicine',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'M001' }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Medicine' }, example: { stock: 600 } } } },
        responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } },
      },
      delete: {
        tags: ['Pharmacy'], summary: 'Remove medicine',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'M001' }],
        responses: { 200: { description: 'Removed' }, 404: { description: 'Not found' } },
      },
    },

    // ── Billing ──────────────────────────────────────────────────────────────
    '/api/billing/invoices': {
      get: {
        tags: ['Billing'], summary: 'Get all invoices',
        responses: { 200: { description: 'List of all invoices', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Invoice' } } } } } },
      },
      post: {
        tags: ['Billing'], summary: 'Create a new invoice',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Invoice' }, example: { patientId: 'P001', amount: 3500.00, description: 'Cardiology consultation', status: 'pending', date: '2026-03-25', paymentmethod: 'card' } } } },
        responses: { 201: { description: 'Invoice created' } },
      },
    },
    '/api/billing/invoices/{id}': {
      get: {
        tags: ['Billing'], summary: 'Get invoice by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'B001' }],
        responses: { 200: { description: 'Invoice found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Invoice' } } } }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Billing'], summary: 'Update payment status',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'B001' }],
        requestBody: { required: true, content: { 'application/json': { example: { status: 'paid' } } } },
        responses: { 200: { description: 'Status updated' }, 400: { description: 'Invalid status' }, 404: { description: 'Not found' } },
      },
      delete: {
        tags: ['Billing'], summary: 'Delete invoice',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'B001' }],
        responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } },
      },
    },

    // ── Lab ──────────────────────────────────────────────────────────────────
    '/api/tests': {
      get: {
        tags: ['Lab'], summary: 'Get all lab tests',
        responses: { 200: { description: 'List of all lab tests', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/LabTest' } } } } } },
      },
      post: {
        tags: ['Lab'], summary: 'Request a new lab test',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LabTest' }, example: { patientId: 'P001', testName: 'Full Blood Count', date: '2026-03-24', technicianName: 'Nimal Jayasinghe' } } } },
        responses: { 201: { description: 'Lab test requested' } },
      },
    },
    '/api/tests/{id}': {
      get: {
        tags: ['Lab'], summary: 'Get lab test by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'L001' }],
        responses: { 200: { description: 'Lab test found', content: { 'application/json': { schema: { $ref: '#/components/schemas/LabTest' } } } }, 404: { description: 'Not found' } },
      },
      put: {
        tags: ['Lab'], summary: 'Update lab test result',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'L001' }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LabTest' }, example: { result: 'Normal', status: 'completed' } } } },
        responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } },
      },
      delete: {
        tags: ['Lab'], summary: 'Delete lab test',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'L001' }],
        responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } },
      },
    },

  },
};

// ─── Swagger UI ────────────────────────────────────────────────────────────
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customSiteTitle: 'Hospital MS — API Gateway',
  swaggerOptions: { docExpansion: 'list' },
}));

// ─── Proxy helper ──────────────────────────────────────────────────────────
const createServiceProxy = (route, target, rewritePath) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^${route}`]: rewritePath },
    on: {
      error: (err, req, res) => {
        res.status(503).json({
          error: `Cannot reach service at ${target}`,
          hint: 'Make sure the service is running'
        });
      }
    }
  });
};

// ─── Proxy Routes — matched exactly to your service mount paths ────────────
app.use('/api/patients',
  createServiceProxy('/api/patients', 'http://localhost:3001', '/patients'));

app.use('/api/doctors',
  createServiceProxy('/api/doctors', 'http://localhost:3002', '/doctors'));

app.use('/api/appointments',
  createServiceProxy('/api/appointments', 'http://localhost:3003', '/appointments'));

app.use('/api/pharmacy/medicines',
  createServiceProxy('/api/pharmacy/medicines', 'http://localhost:3004', '/pharmacy/medicines'));

app.use('/api/billing/invoices',
  createServiceProxy('/api/billing/invoices', 'http://localhost:3005', '/billing/invoices'));

app.use('/api/tests',
  createServiceProxy('/api/tests', 'http://localhost:3006', '/tests'));

// ─── Root ──────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'API Gateway Running',
    swaggerUI: 'http://localhost:3000/docs',
    endpoints: {
      patients:    'http://localhost:3000/api/patients',
      doctors:     'http://localhost:3000/api/doctors',
      appointments:'http://localhost:3000/api/appointments',
      pharmacy:    'http://localhost:3000/api/pharmacy/medicines',
      billing:     'http://localhost:3000/api/billing/invoices',
      lab:         'http://localhost:3000/api/tests',
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway  → http://localhost:${PORT}`);
  console.log(`Swagger UI   → http://localhost:${PORT}/docs`);
});