import { query } from '../config/db';
import { Donor } from '../types';

export class DonorService {
  async getAll() {
    const result = await query('SELECT * FROM donors ORDER BY created_at DESC');
    return result.rows;
  }
  
  async getById(id: number) {
    const result = await query('SELECT * FROM donors WHERE id = $1', [id]);
    return result.rows[0];
  }
  
  async create(donor: Donor) {
    const result = await query(
      'INSERT INTO donors (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [donor.name, donor.email, donor.phone]
    );
    return result.rows[0];
  }
  
  async update(id: number, donor: Donor) {
    const result = await query(
      'UPDATE donors SET name = $1, email = $2, phone = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [donor.name, donor.email, donor.phone, id]
    );
    return result.rows[0];
  }
  
  async delete(id: number) {
    await query('DELETE FROM donors WHERE id = $1', [id]);
  }
}