import * as api from '../api';
import { LOGIN } from '../constants/actionTypes';

export const login = (logInFormData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(logInFormData);

        dispatch({ type: LOGIN, data });

        navigate('/', { replace: true });
    } catch (error) {
        console.log(error);
    }
};

export const signup = (signUpFormData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(signUpFormData);

        dispatch({ type: LOGIN, data });

        navigate('/', { replace: true });
    } catch (error) {
        console.log(error);
    }
};
