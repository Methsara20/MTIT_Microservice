// const express = require('express');
// const router = express.Router();
// let doctors = require('../data/doctorData');

// /**
//  * @swagger
//  * tags:
//  *   name: Doctors
//  *   description: Doctor management
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Doctor:
//  *       type: object
//  *       required:
//  *         - name
//  *         - specialization
//  *       properties:
//  *         id:
//  *           type: string
//  *           example: D001
//  *         name:
//  *           type: string
//  *           example: Dr. Nimal Perera
//  *         specialization:
//  *           type: string
//  *           example: Cardiologist
//  *         phone:
//  *           type: string
//  *           example: 0771112233
//  *         email:
//  *           type: string
//  *           example: nimal.perera@hospital.lk
//  *         availability:
//  *           type: string
//  *           example: Mon - Fri (9:00 AM - 2:00 PM)
//  *         department:
//  *           type: string
//  *           example: Cardiology
//  */

// /**
//  * @swagger
//  * /doctors:
//  *   get:
//  *     summary: Get all doctors
//  *     tags: [Doctors]
//  */
// router.get('/', (req, res) => {
//     res.json(doctors);
// });

// /**
//  * @swagger
//  * /doctors/{id}:
//  *   get:
//  *     summary: Get doctor by ID
//  *     tags: [Doctors]
//  */
// router.get('/:id', (req, res) => {
//     const doctor = doctors.find(d => d.id === req.params.id);
//     if (!doctor) {
//         return res.status(404).json({ message: "Doctor not found" });
//     }
//     res.json(doctor);
// });

// /**
//  * @swagger
//  * /doctors:
//  *   post:
//  *     summary: Create doctor
//  *     tags: [Doctors]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           example:
//  *             name: Dr. Nimal Perera
//  *             specialization: Cardiologist
//  *             phone: 0771112233
//  *             email: nimal.perera@hospital.lk
//  *             availability: Mon - Fri (9:00 AM - 2:00 PM)
//  *             department: Cardiology
//  */
// router.post('/', (req, res) => {
//     const newId = `D${String(doctors.length + 1).padStart(3, '0')}`;

//     const newDoctor = {
//         id: newId,
//         ...req.body
//     };

//     doctors.push(newDoctor);
//     res.status(201).json(newDoctor);
// });

// /**
//  * @swagger
//  * /doctors/{id}:
//  *   put:
//  *     summary: Update doctor
//  *     tags: [Doctors]
//  */
// router.put('/:id', (req, res) => {
//     const index = doctors.findIndex(d => d.id === req.params.id);

//     if (index === -1) {
//         return res.status(404).json({ message: "Doctor not found" });
//     }

//     doctors[index] = { ...doctors[index], ...req.body };
//     res.json(doctors[index]);
// });

// /**
//  * @swagger
//  * /doctors/{id}:
//  *   delete:
//  *     summary: Delete doctor
//  *     tags: [Doctors]
//  */
// router.delete('/:id', (req, res) => {
//     doctors = doctors.filter(d => d.id !== req.params.id);
//     res.json({ message: "Doctor deleted successfully" });
// });

// module.exports = router;

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
 *           example: "0771112233"
 *         email:
 *           type: string
 *           example: nimal.perera@hospital.lk
 *         availability:
 *           type: string
 *           example: "Mon - Fri (9:00 AM - 2:00 PM)"
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
 *     responses:
 *       200:
 *         description: List of all doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: D001
 *     responses:
 *       200:
 *         description: Doctor found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Doctor not found
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
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *           example:
 *             name: Dr. Nimal Perera
 *             specialization: Cardiologist
 *             phone: "0771112233"
 *             email: nimal.perera@hospital.lk
 *             availability: "Mon - Fri (9:00 AM - 2:00 PM)"
 *             department: Cardiology
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 */
router.post('/', (req, res) => {
  const newId = `D${String(doctors.length + 1).padStart(3, '0')}`;
  const newDoctor = { id: newId, ...req.body };
  doctors.push(newDoctor);
  res.status(201).json(newDoctor);
});

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update doctor details
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: D001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *           example:
 *             availability: "Mon - Wed (9:00 AM - 1:00 PM)"
 *             phone: "0779998877"
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Doctor not found
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
 *     summary: Delete a doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: D001
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Doctor not found
 */
router.delete('/:id', (req, res) => {
  const exists = doctors.find(d => d.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ message: "Doctor not found" });
  }
  doctors = doctors.filter(d => d.id !== req.params.id);
  res.json({ message: "Doctor deleted successfully" });
});

module.exports = router;