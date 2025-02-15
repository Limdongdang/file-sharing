import express from 'express';
import { getFiles, getPresignedUrl, getPresignedUrlGetObject, removeFile, uploadFile } from '../controller/file.controller.js';

const router = express.Router();

router.post('/upload', uploadFile);
router.get('/get', getFiles);
router.get('/presigned-url', getPresignedUrl);
router.get('/download', getPresignedUrlGetObject);
router.delete('/remove', removeFile);

export default router;