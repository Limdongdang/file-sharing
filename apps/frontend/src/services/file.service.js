import { instance } from "./config";

const URL_GET_PRESIGNEDURL = '/file/presignedurl';
const getPresignedUrl = () => {
    return instance.get(URL_GET_PRESIGNEDURL);
}

// 파일 리스트 조회
const URL_GET_FILES = '/file/get';
const getFiles = () => {
    return instance.get(URL_GET_FILES);
}

export default {
    getPresignedUrl,
    getFiles,
};