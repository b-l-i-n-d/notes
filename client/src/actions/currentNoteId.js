/* eslint-disable import/prefer-default-export */
export const setCurrentNoteId = (id) => (dispatch) => {
    try {
        dispatch({ type: 'SET_CURRENTNOTEID', payload: id });
    } catch (error) {
        console.log(error);
    }
};
