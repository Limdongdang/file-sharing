// file.service.js
import { File } from "../model/file.model.js";

const getFiles = async () => {
    const files = await File.findAll();
    return files;
}

const uploadFile = async (body) => {
    const { originalname, path, size, mimetype } = body;

    const filename = originalname + Date.now();
    await File.create({
        originalname,
        filename,
        path,
        size,
        mimetype,
    });
}

const getPresignedUrl = async (name) => {
    await minioClient.presignedPutObject('uploads', req.query.name, 24 * 60 * 60, (err, url) => {
        if (err) throw err
    
        const fixedUrl = url.replace('http://minio:9000', 'http://localhost:9002');
        res.send(fixedUrl);
    })
}
        
export default { getFiles, uploadFile, getPresignedUrl };