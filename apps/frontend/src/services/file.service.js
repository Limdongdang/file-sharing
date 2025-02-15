import { instance } from "./config";
import axios from 'axios';

const URL_GET_PRESIGNEDURL = '/file/presigned-url';
const getPresignedUrl = (name) => {
    return instance.get(URL_GET_PRESIGNEDURL, {
        params: {
            name,
        },
    });
}

// 파일 리스트 조회
const URL_GET_FILES = '/file/get';
const getFiles = () => {
    return instance.get(URL_GET_FILES);
}

//minio 업로드
const uploadToMinio = (file, url) => {
    console.log(url.data, file)
    return axios.put(url, file, {
        headers: {
            'Content-Type': file.type,
        },
    });
}
 
export default {
    getPresignedUrl,
    getFiles,
    uploadToMinio,
};