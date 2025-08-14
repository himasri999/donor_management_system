import { query } from '../config/db';
import { Donation } from '../types';

export class DonationService {
  async getAll() {
    const result = await query(`
      SELECT d.*, dn.name as donor_name 
      FROM donations d 
      JOIN donors dn ON d.donor_id = dn.id 
      ORDER BY d.donation_date DESC
    `);
    return result.rows;
  }
  
  async getById(id: number) {
    const result = await query('SELECT * FROM donations WHERE id = $1', [id]);
    return result.rows[0];
  }
  
  async create(donation: Donation) {
    const result = await query(
      'INSERT INTO donations (donor_id, amount) VALUES ($1, $2) RETURNING *',
      [donation.donor_id, donation.amount]
    );
    return result.rows[0];
  }
  
  async update(id: number, donation: Donation) {
    const result = await query(
      'UPDATE donations SET donor_id = $1, amount = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [donation.donor_id, donation.amount, id]
    );
    return result.rows[0];
  }
  
  async delete(id: number) {
    await query('DELETE FROM donations WHERE id = $1', [id]);
  }
}