import * as api from '../api';
import { LOGIN, LOGIN_ERROR } from '../constants/actionTypes';

export const login = (logInFormData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(logInFormData);

        dispatch({ type: LOGIN, data });
        dispatch({ type: LOGIN_ERROR, payload: null });

        navigate('/', { replace: true });
    } catch (error) {
        console.log(error.response.data);
        dispatch({ type: LOGIN_ERROR, payload: error.response.data.message });
    }
};

export const signup = (signUpFormData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(signUpFormData);

        dispatch({ type: LOGIN, data });
        dispatch({ type: LOGIN_ERROR, payload: null });

        navigate('/', { replace: true });
    } catch (error) {
        dispatch({ type: LOGIN_ERROR, payload: error.response.data.message });
    }
};
