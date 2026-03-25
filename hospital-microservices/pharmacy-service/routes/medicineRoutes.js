const express = require('express');
const router = express.Router();
let medicines = require('../data/medicineData');

/**
 * @swagger
 * tags:
 *   name: Pharmacy
 *   description: Medicine inventory management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Medicine:
 *       type: object
 *       required:
 *         - medicineName
 *         - category
 *         - stock
 *         - price
 *         - manufacturer
 *         - expiryDate
 *       properties:
 *         id:
 *           type: string
 *           example: M001
 *         medicineName:
 *           type: string
 *           example: Paracetamol
 *         category:
 *           type: string
 *           example: Analgesic
 *         stock:
 *           type: integer
 *           example: 500
 *         price:
 *           type: number
 *           example: 15.5
 *         manufacturer:
 *           type: string
 *           example: State Pharmaceuticals
 *         expiryDate:
 *           type: string
 *           example: 2026-12-31
 */

/**
 * @swagger
 * /pharmacy/medicines:
 *   get:
 *     summary: Get all medicines
 *     tags: [Pharmacy]
 *     responses:
 *       200:
 *         description: List of medicines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medicine'
 */
router.get('/', (req, res) => {
    res.json(medicines);
});

/**
 * @swagger
 * /pharmacy/medicines/{id}:
 *   get:
 *     summary: Get medicine by ID
 *     tags: [Pharmacy]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The medicine ID
 *     responses:
 *       200:
 *         description: Medicine data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *       404:
 *         description: Medicine not found
 */
router.get('/:id', (req, res) => {
    const medicine = medicines.find(m => m.id === req.params.id);
    if (!medicine) {
        return res.status(404).json({ message: "Medicine not found" });
    }
    res.json(medicine);
});

/**
 * @swagger
 * /pharmacy/medicines:
 *   post:
 *     summary: Add new medicine
 *     tags: [Pharmacy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             medicineName: Ibuprofen
 *             category: NSAID
 *             stock: 300
 *             price: 18.0
 *             manufacturer: GlaxoSmithKline
 *             expiryDate: 2026-10-15
 *     responses:
 *       201:
 *         description: The created medicine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 */
router.post('/', (req, res) => {
    const newId = `M${String(medicines.length + 1).padStart(3, '0')}`;

    const newMedicine = {
        id: newId,
        ...req.body
    };

    medicines.push(newMedicine);
    res.status(201).json(newMedicine);
});

/**
 * @swagger
 * /pharmacy/medicines/{id}:
 *   put:
 *     summary: Update medicine (stock/price etc)
 *     tags: [Pharmacy]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The medicine ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             stock: 450
 *             price: 16.0
 *     responses:
 *       200:
 *         description: The updated medicine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *       404:
 *         description: Medicine not found
 */
router.put('/:id', (req, res) => {
    const index = medicines.findIndex(m => m.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Medicine not found" });
    }

    medicines[index] = { ...medicines[index], ...req.body };
    res.json(medicines[index]);
});

/**
 * @swagger
 * /pharmacy/medicines/{id}:
 *   delete:
 *     summary: Remove medicine
 *     tags: [Pharmacy]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The medicine ID
 *     responses:
 *       200:
 *         description: Success message
 *       404:
 *         description: Medicine not found
 */
router.delete('/:id', (req, res) => {
    medicines = medicines.filter(m => m.id !== req.params.id);
    res.json({ message: "Medicine deleted successfully" });
});

module.exports = router;
