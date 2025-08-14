const { Router } = require('express');
const { query } = require('../config/db');

const router = Router();

// Get all donors
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM donors ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create donor
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const result = await query(
      'INSERT INTO donors (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update donor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await query(
      'UPDATE donors SET name = $1, email = $2, phone = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [name, email, phone, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete donor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM donors WHERE id = $1', [id]);
    res.json({ message: 'Donor deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;