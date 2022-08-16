import { CREATE, DELETE, FETCH_ALL, IS_ERROR, IS_LOADING, UPDATE } from '../constants/actionTypes';

export default (notes = { isLoading: false, data: {}, error: null }, action = {}) => {
    switch (action.type) {
        case IS_LOADING:
            return { ...notes, isLoading: action.payload };
        case IS_ERROR:
            return { ...notes, error: action.payload };
        case FETCH_ALL:
            return { ...notes, data: action.payload };
        case CREATE:
            return {
                ...notes,
                data: {
                    ...notes.data,
                    notes: [action.payload, ...notes.data.notes],
                },
            };
        case UPDATE:
            return {
                ...notes,
                data: {
                    ...notes.data,
                    notes: notes.data.notes.map((note) =>
                        note.id === action.payload.id ? action.payload : note
                    ),
                },
            };
        case DELETE:
            return {
                ...notes,
                data: {
                    ...notes.data,
                    notes: notes.data.notes.filter((note) => note.id !== action.payload),
                },
            };
        default:
            return notes;
    }
};
