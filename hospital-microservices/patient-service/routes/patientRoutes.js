const express = require('express');
const router = express.Router();
let patients = require('../data/patientData');

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - gender
 *       properties:
 *         id:
 *           type: string
 *           example: P001
 *         name:
 *           type: string
 *           example: Kamal Perera
 *         age:
 *           type: integer
 *           example: 45
 *         gender:
 *           type: string
 *           example: Male
 *         bloodType:
 *           type: string
 *           example: O+
 *         phone:
 *           type: string
 *           example: 0771234567
 *         address:
 *           type: string
 *           example: Kandy
 *         medicalHistory:
 *           type: string
 *           example: Diabetes
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 */
router.get('/', (req, res) => {
    res.json(patients);
});

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
 */
router.get('/:id', (req, res) => {
    const patient = patients.find(p => p.id === req.params.id);
    if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
});

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Kamal Perera
 *             age: 45
 *             gender: Male
 *             bloodType: O+
 *             phone: 0771234567
 *             address: Kandy
 *             medicalHistory: Diabetes
 */
router.post('/', (req, res) => {
    const newId = `P${String(patients.length + 1).padStart(3, '0')}`;

    const newPatient = {
        id: newId,
        ...req.body
    };

    patients.push(newPatient);
    res.status(201).json(newPatient);
});

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update patient
 *     tags: [Patients]
 */
router.put('/:id', (req, res) => {
    const index = patients.findIndex(p => p.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Patient not found" });
    }

    patients[index] = { ...patients[index], ...req.body };
    res.json(patients[index]);
});

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete patient
 *     tags: [Patients]
 */
router.delete('/:id', (req, res) => {
    patients = patients.filter(p => p.id !== req.params.id);
    res.json({ message: "Patient deleted successfully" });
});

module.exports = router;