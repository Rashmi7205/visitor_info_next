import express from 'express';
import upload from '../middleware/multer.middleware.js';
import { approveVisit, getVisitorInfoById, saveVisitorData } from '../controllers/visitController.js';

const router = express.Router();

// Handle visitor creation with file uploads
router.post('/create/:id', upload.fields([
  { name: 'documents', maxCount: 10 },
  { name: 'capturedImage', maxCount: 1 }
]), saveVisitorData);
router.post('/approve-visit/:id',approveVisit);
router.get('/:id',getVisitorInfoById);

export default router;