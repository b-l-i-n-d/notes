import { LOGIN, LOGOUT } from '../constants/actionTypes';

export default (state = { loginData: null }, action = {}) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, loginData: action?.data };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, loginData: action?.data };
        default:
            return state;
    }
};
