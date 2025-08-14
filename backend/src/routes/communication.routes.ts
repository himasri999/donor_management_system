import { Router } from 'express';
import { getCommunications, createCommunication, updateCommunication, deleteCommunication, communicationValidation } from '../controllers/communication.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getCommunications);
router.post('/', communicationValidation, createCommunication);
router.put('/:id', communicationValidation, updateCommunication);
router.delete('/:id', deleteCommunication);

export default router;