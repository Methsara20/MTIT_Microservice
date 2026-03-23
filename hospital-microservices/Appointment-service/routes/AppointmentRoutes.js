const express = require('express');
const router = express.Router();
let appointments = require('../data/AppointmentData');

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - patientId
 *         - doctorName
 *         - date
 *         - time
 *       properties:
 *         id:
 *           type: string
 *           example: A001
 *         patientId:
 *           type: string
 *           example: P001
 *         doctorName:
 *           type: string
 *           example: Dr. Fernando
 *         specialization:
 *           type: string
 *           example: Cardiologist
 *         date:
 *           type: string
 *           example: 2026-03-25
 *         time:
 *           type: string
 *           example: 10:30 AM
 *         status:
 *           type: string
 *           example: Scheduled
 *         notes:
 *           type: string
 *           example: Regular checkup
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 */
router.get('/', (req, res) => {
    res.json(appointments);
});

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 */
router.get('/:id', (req, res) => {
    const appointment = appointments.find(a => a.id === req.params.id);

    if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
});

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             patientId: P001
 *             doctorName: Dr. Fernando
 *             specialization: Cardiologist
 *             date: 2026-03-25
 *             time: 10:30 AM
 *             status: Scheduled
 *             notes: Regular checkup
 */
router.post('/', (req, res) => {
    const newId = `A${String(appointments.length + 1).padStart(3, '0')}`;

    const newAppointment = {
        id: newId,
        ...req.body
    };

    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
});

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update appointment
 *     tags: [Appointments]
 */
router.put('/:id', (req, res) => {
    const index = appointments.findIndex(a => a.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Appointment not found" });
    }

    appointments[index] = { ...appointments[index], ...req.body };
    res.json(appointments[index]);
});

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete appointment
 *     tags: [Appointments]
 */
router.delete('/:id', (req, res) => {
    appointments = appointments.filter(a => a.id !== req.params.id);
    res.json({ message: "Appointment deleted successfully" });
});

module.exports = router;