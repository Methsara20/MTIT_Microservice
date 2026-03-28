// const express = require('express');
// const router = express.Router();

// let invoices = require('../data/BillingData');

// /**
//  * @swagger
//  * tags:
//  *   name: Billing
//  *   description: Billing management
//  */

// /**
//  * @swagger
//  * /billing/invoices:
//  *   get:
//  *     summary: Get all invoices
//  *     tags: [Billing]
//  */
// router.get('/', (req, res) => {
//   res.json(invoices);
// });

// /**
//  * @swagger
//  * /billing/invoices/{id}:
//  *   get:
//  *     summary: Get invoice by ID
//  *     tags: [Billing]
//  */
// router.get('/:id', (req, res) => {
//   const invoice = invoices.find(i => i.id === req.params.id);

//   if (!invoice) {
//     return res.status(404).json({ message: "Invoice not found" });
//   }

//   res.json(invoice);
// });

// /**
//  * @swagger
//  * /billing/invoices:
//  *   post:
//  *     summary: Create new invoice
//  *     tags: [Billing]
//  */
// router.post('/', (req, res) => {
//   const newId = `B${String(invoices.length + 1).padStart(3, '0')}`;

//   const newInvoice = {
//     id: newId,
//     patientId: req.body.patientId,
//     amount: req.body.amount,
//     description: req.body.description,
//     status: req.body.status || "pending",
//     date: req.body.date,
//     paymentmethod: req.body.paymentmethod
//   };

//   invoices.push(newInvoice);
//   res.status(201).json(newInvoice);
// });

// /**
//  * @swagger
//  * /billing/invoice/{id}:
//  *   put:
//  *     summary: Update payment status
//  *     tags: [Billing]
//  */
// router.put('/invoice/:id', (req, res) => {
//   const invoice = invoices.find(i => i.id === req.params.id);

//   if (!invoice) {
//     return res.status(404).json({ message: "Invoice not found" });
//   }

//   const newStatus = req.body.status;

//   // ✅ Allowed statuses
//   const allowedStatus = ["pending", "paid", "overdue"];

//   if (!allowedStatus.includes(newStatus)) {
//     return res.status(400).json({
//       message: "Invalid status. Use pending, paid, or overdue"
//     });
//   }

//   // ✅ Demo-friendly logic
//   if (invoice.status === "pending" && newStatus === "paid") {
//     invoice.status = "paid";
//   } else if (newStatus === "overdue") {
//     invoice.status = "overdue";
//   } else {
//     invoice.status = newStatus;
//   }

//   res.json({
//     message: "Payment status updated successfully",
//     invoice
//   });
// });

// /**
//  * @swagger
//  * /billing/invoices/{id}:
//  *   delete:
//  *     summary: Delete invoice
//  *     tags: [Billing]
//  */
// router.delete('/:id', (req, res) => {
//   const exists = invoices.find(i => i.id === req.params.id);

//   if (!exists) {
//     return res.status(404).json({ message: "Invoice not found" });
//   }

//   invoices = invoices.filter(i => i.id !== req.params.id);

//   res.json({ message: "Invoice deleted successfully" });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
let invoices = require('../data/BillingData');

/**
 * @swagger
 * tags:
 *   name: Billing
 *   description: Billing management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       required:
 *         - patientId
 *         - amount
 *         - description
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           example: B001
 *         patientId:
 *           type: string
 *           example: P001
 *         amount:
 *           type: number
 *           example: 3500.00
 *         description:
 *           type: string
 *           example: Cardiology consultation
 *         status:
 *           type: string
 *           enum: [pending, paid, overdue]
 *           example: pending
 *         date:
 *           type: string
 *           example: "2026-03-25"
 *         paymentmethod:
 *           type: string
 *           enum: [cash, card, insurance, ""]
 *           example: card
 */

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Billing]
 *     responses:
 *       200:
 *         description: List of all invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 */
router.get('/', (req, res) => {
  res.json(invoices);
});

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: B001
 *     responses:
 *       200:
 *         description: Invoice found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invoice not found
 */
router.get('/:id', (req, res) => {
  const invoice = invoices.find(i => i.id === req.params.id);
  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }
  res.json(invoice);
});

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create new invoice
 *     tags: [Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *           example:
 *             patientId: P001
 *             amount: 3500.00
 *             description: Cardiology consultation
 *             status: pending
 *             date: "2026-03-25"
 *             paymentmethod: card
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 */
router.post('/', (req, res) => {
  const newId = `B${String(invoices.length + 1).padStart(3, '0')}`;
  const newInvoice = {
    id: newId,
    patientId: req.body.patientId,
    amount: req.body.amount,
    description: req.body.description,
    status: req.body.status || "pending",
    date: req.body.date,
    paymentmethod: req.body.paymentmethod
  };
  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

/**
 * @swagger
 * /invoices/{id}:
 *   put:
 *     summary: Update payment status
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: B001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, overdue]
 *                 example: paid
 *           example:
 *             status: paid
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment status updated successfully
 *                 invoice:
 *                   $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Invalid status value
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid status. Use pending, paid, or overdue
 *       404:
 *         description: Invoice not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invoice not found
 */
router.put('/:id', (req, res) => {
  const invoice = invoices.find(i => i.id === req.params.id);
  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  const newStatus = req.body.status;
  const allowedStatus = ["pending", "paid", "overdue"];

  if (!allowedStatus.includes(newStatus)) {
    return res.status(400).json({
      message: "Invalid status. Use pending, paid, or overdue"
    });
  }

  if (invoice.status === "pending" && newStatus === "paid") {
    invoice.status = "paid";
  } else if (newStatus === "overdue") {
    invoice.status = "overdue";
  } else {
    invoice.status = newStatus;
  }

  res.json({ message: "Payment status updated successfully", invoice });
});

/**
 * @swagger
 * /invoices/{id}:
 *   delete:
 *     summary: Delete invoice
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: B001
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invoice deleted successfully
 *       404:
 *         description: Invoice not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invoice not found
 */
router.delete('/:id', (req, res) => {
  const exists = invoices.find(i => i.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ message: "Invoice not found" });
  }
  invoices = invoices.filter(i => i.id !== req.params.id);
  res.json({ message: "Invoice deleted successfully" });
});

module.exports = router;