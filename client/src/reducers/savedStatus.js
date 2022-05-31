export default (isSaved = true, action = {}) => {
    switch (action.type) {
        case 'NEED_SAVING':
            return action.payload;
        case 'RESET_ISSAVED':
            return action.payload;
        default:
            return isSaved;
    }
};
