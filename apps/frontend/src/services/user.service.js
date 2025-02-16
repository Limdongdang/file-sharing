import { instance } from "./config";

const URL_POST_LOGIN = '/user/login';
const loginUser = (body) => {
    console.log('body:', body);
    return instance.post(URL_POST_LOGIN, body);
}
 
export default {
    loginUser,
};