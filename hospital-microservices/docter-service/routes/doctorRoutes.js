const express = require('express');
const router = express.Router();
let doctors = require('../data/doctorData');

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       required:
 *         - name
 *         - specialization
 *       properties:
 *         id:
 *           type: string
 *           example: D001
 *         name:
 *           type: string
 *           example: Dr. Nimal Perera
 *         specialization:
 *           type: string
 *           example: Cardiologist
 *         phone:
 *           type: string
 *           example: 0771112233
 *         email:
 *           type: string
 *           example: nimal.perera@hospital.lk
 *         availability:
 *           type: string
 *           example: Mon - Fri (9:00 AM - 2:00 PM)
 *         department:
 *           type: string
 *           example: Cardiology
 */

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 */
router.get('/', (req, res) => {
    res.json(doctors);
});

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctors]
 */
router.get('/:id', (req, res) => {
    const doctor = doctors.find(d => d.id === req.params.id);
    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
});

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Dr. Nimal Perera
 *             specialization: Cardiologist
 *             phone: 0771112233
 *             email: nimal.perera@hospital.lk
 *             availability: Mon - Fri (9:00 AM - 2:00 PM)
 *             department: Cardiology
 */
router.post('/', (req, res) => {
    const newId = `D${String(doctors.length + 1).padStart(3, '0')}`;

    const newDoctor = {
        id: newId,
        ...req.body
    };

    doctors.push(newDoctor);
    res.status(201).json(newDoctor);
});

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update doctor
 *     tags: [Doctors]
 */
router.put('/:id', (req, res) => {
    const index = doctors.findIndex(d => d.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Doctor not found" });
    }

    doctors[index] = { ...doctors[index], ...req.body };
    res.json(doctors[index]);
});

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete doctor
 *     tags: [Doctors]
 */
router.delete('/:id', (req, res) => {
    doctors = doctors.filter(d => d.id !== req.params.id);
    res.json({ message: "Doctor deleted successfully" });
});

module.exports = router;