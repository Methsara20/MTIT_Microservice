// const express = require('express');
// const router = express.Router();
// let appointments = require('../data/AppointmentData');

// /**
//  * @swagger
//  * tags:
//  *   name: Appointments
//  *   description: Appointment management
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Appointment:
//  *       type: object
//  *       required:
//  *         - patientId
//  *         - doctorName
//  *         - date
//  *         - time
//  *       properties:
//  *         id:
//  *           type: string
//  *           example: A001
//  *         patientId:
//  *           type: string
//  *           example: P001
//  *         doctorName:
//  *           type: string
//  *           example: Dr. Fernando
//  *         specialization:
//  *           type: string
//  *           example: Cardiologist
//  *         date:
//  *           type: string
//  *           example: 2026-03-25
//  *         time:
//  *           type: string
//  *           example: 10:30 AM
//  *         status:
//  *           type: string
//  *           example: Scheduled
//  *         notes:
//  *           type: string
//  *           example: Regular checkup
//  */

// /**
//  * @swagger
//  * /appointments:
//  *   get:
//  *     summary: Get all appointments
//  *     tags: [Appointments]
//  */
// router.get('/', (req, res) => {
//     res.json(appointments);
// });

// /**
//  * @swagger
//  * /appointments/{id}:
//  *   get:
//  *     summary: Get appointment by ID
//  *     tags: [Appointments]
//  */
// router.get('/:id', (req, res) => {
//     const appointment = appointments.find(a => a.id === req.params.id);

//     if (!appointment) {
//         return res.status(404).json({ message: "Appointment not found" });
//     }

//     res.json(appointment);
// });

// /**
//  * @swagger
//  * /appointments:
//  *   post:
//  *     summary: Create appointment
//  *     tags: [Appointments]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           example:
//  *             patientId: P001
//  *             doctorName: Dr. Fernando
//  *             specialization: Cardiologist
//  *             date: 2026-03-25
//  *             time: 10:30 AM
//  *             status: Scheduled
//  *             notes: Regular checkup
//  */
// router.post('/', (req, res) => {
//     const newId = `A${String(appointments.length + 1).padStart(3, '0')}`;

//     const newAppointment = {
//         id: newId,
//         ...req.body
//     };

//     appointments.push(newAppointment);
//     res.status(201).json(newAppointment);
// });

// /**
//  * @swagger
//  * /appointments/{id}:
//  *   put:
//  *     summary: Update appointment
//  *     tags: [Appointments]
//  */
// router.put('/:id', (req, res) => {
//     const index = appointments.findIndex(a => a.id === req.params.id);

//     if (index === -1) {
//         return res.status(404).json({ message: "Appointment not found" });
//     }

//     appointments[index] = { ...appointments[index], ...req.body };
//     res.json(appointments[index]);
// });

// /**
//  * @swagger
//  * /appointments/{id}:
//  *   delete:
//  *     summary: Delete appointment
//  *     tags: [Appointments]
//  */
// router.delete('/:id', (req, res) => {
//     appointments = appointments.filter(a => a.id !== req.params.id);
//     res.json({ message: "Appointment deleted successfully" });
// });

// module.exports = router;

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
 *           example: "2026-03-25"
 *         time:
 *           type: string
 *           example: "10:30 AM"
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
 *     responses:
 *       200:
 *         description: List of all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: A001
 *     responses:
 *       200:
 *         description: Appointment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment not found
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
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *           example:
 *             patientId: P001
 *             doctorName: Dr. Fernando
 *             specialization: Cardiologist
 *             date: "2026-03-25"
 *             time: "10:30 AM"
 *             status: Scheduled
 *             notes: Regular checkup
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 */
router.post('/', (req, res) => {
    const newId = `A${String(appointments.length + 1).padStart(3, '0')}`;
    const newAppointment = { id: newId, ...req.body };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
});

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: A001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *           example:
 *             status: Completed
 *             notes: Follow-up required
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment not found
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: A001
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointment not found
 */
router.delete('/:id', (req, res) => {
    const exists = appointments.find(a => a.id === req.params.id);
    if (!exists) {
        return res.status(404).json({ message: "Appointment not found" });
    }
    appointments = appointments.filter(a => a.id !== req.params.id);
    res.json({ message: "Appointment deleted successfully" });
});

module.exports = router;