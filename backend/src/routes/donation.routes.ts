import { Router } from 'express';
import { getDonations, createDonation, updateDonation, deleteDonation, donationValidation } from '../controllers/donation.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getDonations);
router.post('/', donationValidation, createDonation);
router.put('/:id', donationValidation, updateDonation);
router.delete('/:id', deleteDonation);

export default router;