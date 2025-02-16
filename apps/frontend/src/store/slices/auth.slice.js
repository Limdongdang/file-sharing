import { createSlice } from '@reduxjs/toolkit';
import userService from '@services/user.service';

const initialState = {
    isAuthenticated: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth : (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        clearAuth : (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const checkAuthStatus = () => async (dispatch) => {
    try{
        const response = await userService.authenticateUser();

        if(response.status === 200) {
            dispatch(setAuth({ user: response.data.user }));
        } else {
            dispatch(clearAuth());
        }
    } catch (error) {
        console.error('인증 상태 확인 중 에러 발생:', error);
    }
} 

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;