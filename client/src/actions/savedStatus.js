export const needSaving = () => (dispatch) => {
    try {
        dispatch({ type: 'NEED_SAVING', payload: false });
    } catch (error) {
        console.log(error);
    }
};

export const resetIsSaved = () => (dispatch) => {
    try {
        dispatch({ type: 'RESET_ISSAVED', payload: true });
    } catch (error) {
        console.log(error);
    }
};
