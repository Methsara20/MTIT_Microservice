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
 * /billing/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Billing]
 */
router.get('/', (req, res) => {
  res.json(invoices);
});

/**
 * @swagger
 * /billing/invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Billing]
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
 * /billing/invoices:
 *   post:
 *     summary: Create new invoice
 *     tags: [Billing]
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
 * /billing/invoice/{id}:
 *   put:
 *     summary: Update payment status
 *     tags: [Billing]
 */
router.put('/invoice/:id', (req, res) => {
  const invoice = invoices.find(i => i.id === req.params.id);

  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  const newStatus = req.body.status;

  // ✅ Allowed statuses
  const allowedStatus = ["pending", "paid", "overdue"];

  if (!allowedStatus.includes(newStatus)) {
    return res.status(400).json({
      message: "Invalid status. Use pending, paid, or overdue"
    });
  }

  // ✅ Demo-friendly logic
  if (invoice.status === "pending" && newStatus === "paid") {
    invoice.status = "paid";
  } else if (newStatus === "overdue") {
    invoice.status = "overdue";
  } else {
    invoice.status = newStatus;
  }

  res.json({
    message: "Payment status updated successfully",
    invoice
  });
});

/**
 * @swagger
 * /billing/invoices/{id}:
 *   delete:
 *     summary: Delete invoice
 *     tags: [Billing]
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