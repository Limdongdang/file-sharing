import fileService from '../service/file.service.js';

export const uploadFile = async (req, res) => {
    try {
        await fileService.uploadFile(req.user, req.body);
        res.status(200).send('파일 업로드 성공');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};

export const getFiles = async (req, res) => {
    try {
        const result = await fileService.getFiles();
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const getPresignedUrl = async (req, res) => {
    console.log(req.user, req.query.name);
    try {
        const url = await fileService.getPresignedUrl(req.user, req.query.name);
        res.status(200).send(url);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const getPresignedUrlGetObject = async (req, res) => {
    try {
        const url = await fileService.getPresignedUrlGetObject(req.user, req.query.name);
        res.status(200).send(url);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const removeFile = async (req, res) => {
    try {
        await fileService.removeFile(req.user, req.query);
        res.status(200).send('파일 삭제 성공');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}