import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { CommunicationService } from '../services/communication.service';
import { AuthRequest } from '../middleware/auth.middleware';
import logger from '../utils/logger';

const communicationService = new CommunicationService();

export const communicationValidation = [
  body('donor_id').isInt({ min: 1 }).withMessage('Valid donor ID is required'),
  body('message').notEmpty().withMessage('Message is required')
];

export const getCommunications = async (req: AuthRequest, res: Response) => {
  try {
    const communications = await communicationService.getAll();
    res.json(communications);
  } catch (error: any) {
    logger.error(`Get communications failed: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const createCommunication = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const communication = await communicationService.create(req.body);
    logger.info(`Communication created for donor: ${communication.donor_id}`);
    res.status(201).json(communication);
  } catch (error: any) {
    logger.error(`Create communication failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export const updateCommunication = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const communication = await communicationService.update(parseInt(req.params.id), req.body);
    if (!communication) {
      return res.status(404).json({ message: 'Communication not found' });
    }
    
    logger.info(`Communication updated: ${communication.id}`);
    res.json(communication);
  } catch (error: any) {
    logger.error(`Update communication failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export const deleteCommunication = async (req: AuthRequest, res: Response) => {
  try {
    await communicationService.delete(parseInt(req.params.id));
    logger.info(`Communication deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error: any) {
    logger.error(`Delete communication failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};