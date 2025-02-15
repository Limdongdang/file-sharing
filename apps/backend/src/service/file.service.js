// file.service.js
import { minioClient } from "../config/minio.js";
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
    return new Promise((resolve, reject) => {
        minioClient.presignedPutObject('uploads', name, 24 * 60 * 60, (err, url) => {
            if (err) {
                reject(err);
            } else {
                resolve(url);
            }
        })
    })
}

const getPresignedUrlGetObject = async (name) => {
    return new Promise((resolve, reject) => {
        minioClient.presignedGetObject('uploads', name, 60, (err, url) => {
            if (err) {
                reject(err);
            } else {
                resolve(url);
            }
        })
    })
}
        
export default { getFiles, uploadFile, getPresignedUrl, getPresignedUrlGetObject };