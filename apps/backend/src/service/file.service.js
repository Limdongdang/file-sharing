// file.service.js
import { minioClient } from "../config/minio.js";
import { File } from "../model/file.model.js";
import { sequelize } from "../model/index.js";

const getFiles = async () => {
    const files = await File.findAll();
    return files;
}

const uploadFile = async (user, body) => {
    const { originalname, path, size, mimetype } = body;

    const uploader = user.id;

    const filename = originalname + Date.now();
    await File.create({
        originalname,
        filename,
        path,
        size,
        mimetype,
        uploader: uploader
    });
}

const removeFile = async (user, data) => {
    const transaction = await sequelize.transaction();

    try{
        await File.destroy({
            where: {
                id: data.id, 
            },
            transaction,
        });
        
        await minioClient.removeObject(user.username , data.name , (err) => {
            if (err) {
                console.log(err);
            }
        });
    
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }

}

const changeExternalUrl = (url) => {
    return url.replace(process.env.MINIO_INTERNAL_ENDPOINT || 'http://localhost:9000',
    process.env.MINIO_EXTERNAL_ENDPOINT || 'http://localhost:9000');
}

const getPresignedUrl = async (user, filename) => {
    await checkAndCreateBucket(user.username);

    return new Promise((resolve, reject) => {
        minioClient.presignedPutObject(user.username, filename, 24 * 60 * 60, (err, url) => {
            if (err) {
                reject(err);
            } else {
                console.log(url);
                const externalUrl = changeExternalUrl(url);
                resolve(externalUrl);
            }
        })
    })
}

const getPresignedUrlGetObject = async (user, filename) => {
    return new Promise((resolve, reject) => {
        minioClient.presignedGetObject(user.username, filename, 60, (err, url) => {
            if (err) {
                reject(err);
            } else {
                const externalUrl = changeExternalUrl(url);
                resolve(externalUrl);
            }
        })
    })
}

const checkAndCreateBucket = async (bucketName) => {
    return new Promise((resolve, reject) => {
        minioClient.bucketExists(bucketName, (err, exists) => {
            if (exists) {
                resolve();
            } else if (!exists) {
                minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
            else{
                reject(err);
            }
        });
    });
}
        
export default { getFiles, uploadFile, getPresignedUrl, getPresignedUrlGetObject, removeFile };