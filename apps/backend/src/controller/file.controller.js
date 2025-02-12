// const fileService = require('../service/file.service');

export const uploadFile = async (req, res) => {
    try {
        res.status(200).send('파일 업로드 성공');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};