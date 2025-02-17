import { instance } from '@services/config';
import userService from '@services/user.service';

instance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        console.error('response interceptor error', error);
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                return userService.refreshAccessToken()
                    .then(response => {
                        if (response.status === 200) {
                            return instance(originalRequest);
                        }
                    });
            } catch (error) {
                console.error('토큰 갱신 실패', error);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;