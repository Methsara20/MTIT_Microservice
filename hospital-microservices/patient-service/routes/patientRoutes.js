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
 *           example: "0771234567"
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
 *     responses:
 *       200:
 *         description: List of all patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: P001
 *     responses:
 *       200:
 *         description: Patient found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient not found
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
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *           example:
 *             name: Kamal Perera
 *             age: 45
 *             gender: Male
 *             bloodType: O+
 *             phone: "0771234567"
 *             address: Kandy
 *             medicalHistory: Diabetes
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
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
 *     summary: Update patient details
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: P001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *           example:
 *             address: Colombo
 *             medicalHistory: Diabetes, Hypertension
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient not found
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
 *     summary: Delete a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: P001
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient deleted successfully
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient not found
 */
router.delete('/:id', (req, res) => {
  const exists = patients.find(p => p.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ message: "Patient not found" });
  }
  patients = patients.filter(p => p.id !== req.params.id);
  res.json({ message: "Patient deleted successfully" });
});

module.exports = router;