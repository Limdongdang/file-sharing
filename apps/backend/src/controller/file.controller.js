// const fileService = require('../service/file.service');

/**
 * @swagger
 * /file/upload:
 *   get:
 *     summary: Upload a file
 *     tags:
 *       - File
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       500:
 *         description: Internal server error
 */
export const uploadFile = async (req, res) => {
    try {
        res.status(200).send('파일 업로드 성공');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};