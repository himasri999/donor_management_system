const { Router } = require('express');
const { query } = require('../config/db');

const router = Router();

// Get all communications
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT c.*, d.name as donor_name 
      FROM communications c 
      LEFT JOIN donors d ON c.donor_id = d.id 
      ORDER BY c.communication_date DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create communication
router.post('/', async (req, res) => {
  try {
    const { donor_id, message } = req.body;
    const result = await query(
      'INSERT INTO communications (donor_id, message) VALUES ($1, $2) RETURNING *',
      [donor_id, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;