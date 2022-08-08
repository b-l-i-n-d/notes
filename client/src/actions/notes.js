import * as api from '../api';
import { CREATE, DELETE, FETCH_ALL, IS_ERROR, IS_LOADING, UPDATE } from '../constants/actionTypes';

export const getNotes = () => async (dispatch) => {
    try {
        dispatch({ type: IS_LOADING, payload: true });

        const { data } = await api.fetchNotes();

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: IS_ERROR, payload: null });
        dispatch({ type: IS_LOADING, payload: false });
    } catch (error) {
        dispatch({ type: IS_ERROR, payload: error.message });
        dispatch({ type: IS_LOADING, payload: false });
    }
};

export const createNote = (note) => async (dispatch) => {
    try {
        dispatch({ type: IS_LOADING, payload: true });

        const { data } = await api.createNote(note);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: IS_ERROR, payload: null });
        dispatch({ type: IS_LOADING, payload: false });
    } catch (error) {
        dispatch({ type: IS_ERROR, payload: error.message });
        dispatch({ type: IS_LOADING, payload: false });
    }
};

export const updateNote = (id, note) => async (dispatch) => {
    try {
        dispatch({ type: IS_LOADING, payload: true });

        const { data } = await api.updateNote(id, note);

        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: IS_ERROR, payload: null });
        dispatch({ type: IS_LOADING, payload: false });
    } catch (error) {
        dispatch({ type: IS_ERROR, payload: error.message });
        dispatch({ type: IS_LOADING, payload: false });
    }
};

export const deleteNote = (id) => async (dispatch) => {
    try {
        dispatch({ type: IS_LOADING, payload: true });

        await api.deleteNote(id);

        dispatch({ type: DELETE, payload: id });
        dispatch({ type: IS_LOADING, payload: false });
    } catch (error) {
        dispatch({ type: IS_ERROR, payload: error.message });
        dispatch({ type: IS_LOADING, payload: false });
    }
};
