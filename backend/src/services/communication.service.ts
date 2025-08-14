import { query } from '../config/db';
import { Communication } from '../types';

export class CommunicationService {
  async getAll() {
    const result = await query(`
      SELECT c.*, d.name as donor_name 
      FROM communications c 
      JOIN donors d ON c.donor_id = d.id 
      ORDER BY c.communication_date DESC
    `);
    return result.rows;
  }
  
  async getById(id: number) {
    const result = await query('SELECT * FROM communications WHERE id = $1', [id]);
    return result.rows[0];
  }
  
  async create(communication: Communication) {
    const result = await query(
      'INSERT INTO communications (donor_id, message) VALUES ($1, $2) RETURNING *',
      [communication.donor_id, communication.message]
    );
    return result.rows[0];
  }
  
  async update(id: number, communication: Communication) {
    const result = await query(
      'UPDATE communications SET donor_id = $1, message = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [communication.donor_id, communication.message, id]
    );
    return result.rows[0];
  }
  
  async delete(id: number) {
    await query('DELETE FROM communications WHERE id = $1', [id]);
  }
}