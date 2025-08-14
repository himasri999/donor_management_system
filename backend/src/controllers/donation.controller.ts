import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DonationService } from '../services/donation.service';
import { AuthRequest } from '../middleware/auth.middleware';
import logger from '../utils/logger';

const donationService = new DonationService();

export const donationValidation = [
  body('donor_id').isInt({ min: 1 }).withMessage('Valid donor ID is required'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0')
];

export const getDonations = async (req: AuthRequest, res: Response) => {
  try {
    const donations = await donationService.getAll();
    res.json(donations);
  } catch (error: any) {
    logger.error(`Get donations failed: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const createDonation = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const donation = await donationService.create(req.body);
    logger.info(`Donation created: $${donation.amount}`);
    res.status(201).json(donation);
  } catch (error: any) {
    logger.error(`Create donation failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export const updateDonation = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const donation = await donationService.update(parseInt(req.params.id), req.body);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    logger.info(`Donation updated: $${donation.amount}`);
    res.json(donation);
  } catch (error: any) {
    logger.error(`Update donation failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export const deleteDonation = async (req: AuthRequest, res: Response) => {
  try {
    await donationService.delete(parseInt(req.params.id));
    logger.info(`Donation deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error: any) {
    logger.error(`Delete donation failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};