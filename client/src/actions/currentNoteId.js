import { SET_CURRENTNOTEID } from '../constants/actionTypes';

/* eslint-disable import/prefer-default-export */
export const setCurrentNoteId = (id) => async (dispatch) => {
    try {
        dispatch({ type: SET_CURRENTNOTEID, payload: id });
    } catch (error) {
        console.log(error);
    }
};
