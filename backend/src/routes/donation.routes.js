const { Router } = require('express');
const { query } = require('../config/db');

const router = Router();

// Get all donations
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT d.*, don.name as donor_name 
      FROM donations d 
      LEFT JOIN donors don ON d.donor_id = don.id 
      ORDER BY d.donation_date DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create donation
router.post('/', async (req, res) => {
  try {
    const { donor_id, amount } = req.body;
    const result = await query(
      'INSERT INTO donations (donor_id, amount) VALUES ($1, $2) RETURNING *',
      [donor_id, amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;