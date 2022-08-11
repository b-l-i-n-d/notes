import { LOGIN, LOGIN_ERROR, LOGOUT } from '../constants/actionTypes';

export default (state = { loginData: null, error: null }, action = {}) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, loginData: action?.data };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, loginData: action?.data };
        case LOGIN_ERROR:
            return { ...state, error: action?.payload };
        default:
            return state;
    }
};
