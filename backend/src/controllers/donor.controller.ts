import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DonorService } from '../services/donor.service';
import { AuthRequest } from '../middleware/auth.middleware';
import logger from '../utils/logger';

const donorService = new DonorService();

export const donorValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number required')
];

export const getDonors = async (req: AuthRequest, res: Response) => {
  try {
    const donors = await donorService.getAll();
    res.json(donors);
  } catch (error: any) {
    logger.error(`Get donors failed: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const createDonor = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const donor = await donorService.create(req.body);
    logger.info(`Donor created: ${donor.name}`);
    res.status(201).json(donor);
  } catch (error: any) {
    logger.error(`Create donor failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export const updateDonor = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const donor = await donorService.update(parseInt(req.params.id), req.body);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    
    logger.info(`Donor updated: ${donor.name}`);
    res.json(donor);
  } catch (error: any) {
    logger.error(`Update donor failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export const deleteDonor = async (req: AuthRequest, res: Response) => {
  try {
    await donorService.delete(parseInt(req.params.id));
    logger.info(`Donor deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error: any) {
    logger.error(`Delete donor failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};