const express = require('express');
const router = express.Router();
const labTests = require('../data/labData');

/**
 * @swagger
 * components:
 *   schemas:
 *     LabTest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         patientId:
 *           type: string
 *         testName:
 *           type: string
 *         result:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, processing, completed]
 *         date:
 *           type: string
 *         technicianName:
 *           type: string
 */

/**
 * @swagger
 * /tests:
 *   get:
 *     summary: Get all lab tests
 *     tags: [Lab]
 *     responses:
 *       200:
 *         description: List of all lab tests
 */
router.get('/', (req, res) => {
  res.json(labTests);
});

/**
 * @swagger
 * /tests/{id}:
 *   get:
 *     summary: Get a lab test by ID
 *     tags: [Lab]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lab test found
 *       404:
 *         description: Lab test not found
 */
router.get('/:id', (req, res) => {
  const test = labTests.find(t => t.id === parseInt(req.params.id));
  if (!test) return res.status(404).json({ message: 'Lab test not found' });
  res.json(test);
});

/**
 * @swagger
 * /tests:
 *   post:
 *     summary: Request a new lab test
 *     tags: [Lab]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LabTest'
 *     responses:
 *       201:
 *         description: Lab test created successfully
 */
router.post('/', (req, res) => {
  const newTest = {
    id: labTests.length + 1,
    patientId: req.body.patientId,
    testName: req.body.testName,
    result: req.body.result || '',
    status: req.body.status || 'pending',
    date: req.body.date,
    technicianName: req.body.technicianName
  };
  labTests.push(newTest);
  res.status(201).json(newTest);
});

/**
 * @swagger
 * /tests/{id}:
 *   put:
 *     summary: Update a lab test result
 *     tags: [Lab]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LabTest'
 *     responses:
 *       200:
 *         description: Lab test updated successfully
 *       404:
 *         description: Lab test not found
 */
router.put('/:id', (req, res) => {
  const index = labTests.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Lab test not found' });

  labTests[index] = {
    ...labTests[index],
    patientId: req.body.patientId || labTests[index].patientId,
    testName: req.body.testName || labTests[index].testName,
    result: req.body.result || labTests[index].result,
    status: req.body.status || labTests[index].status,
    date: req.body.date || labTests[index].date,
    technicianName: req.body.technicianName || labTests[index].technicianName
  };

  res.json(labTests[index]);
});

/**
 * @swagger
 * /tests/{id}:
 *   delete:
 *     summary: Remove a lab test record
 *     tags: [Lab]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lab test deleted successfully
 *       404:
 *         description: Lab test not found
 */
router.delete('/:id', (req, res) => {
  const index = labTests.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Lab test not found' });

  labTests.splice(index, 1);
  res.json({ message: 'Lab test deleted successfully' });
});

module.exports = router;