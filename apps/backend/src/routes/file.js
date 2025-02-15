import express from 'express';
import { getFiles, getPresignedUrl, uploadFile } from '../controller/file.controller.js';

const router = express.Router();

router.post('/upload', uploadFile);
router.get('/get', getFiles);
router.get('/presigned-url', getPresignedUrl);

export default router;