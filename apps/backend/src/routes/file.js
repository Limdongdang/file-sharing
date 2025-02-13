import express from 'express';
import { getFiles, uploadFile } from '../controller/file.controller.js';

const router = express.Router();

router.get('/upload', uploadFile);
router.get('/get', getFiles);

export default router;