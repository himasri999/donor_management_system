import { Router } from 'express';
import { getDonors, createDonor, updateDonor, deleteDonor, donorValidation } from '../controllers/donor.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getDonors);
router.post('/', donorValidation, createDonor);
router.put('/:id', donorValidation, updateDonor);
router.delete('/:id', deleteDonor);

export default router;