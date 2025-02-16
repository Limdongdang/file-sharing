import { instance } from "./config";

const URL_POST_LOGIN = '/user/login';
const loginUser = (body) => {
    return instance.post(URL_POST_LOGIN, body);
}

const URL_GET_AUTH = '/user/auth';
const authenticateUser = () => {
    return instance.get(URL_GET_AUTH);
}

const URL_POST_LOGOUT = '/user/logout';
const logoutUser = () => {
    return instance.post(URL_POST_LOGOUT);
}

const URL_POST_REFRESH = '/user/refresh';
const refreshAccessToken = () => {
    return instance.post(URL_POST_REFRESH);
}
 
export default {
    loginUser,
    authenticateUser,
    logoutUser,
    refreshAccessToken,
};