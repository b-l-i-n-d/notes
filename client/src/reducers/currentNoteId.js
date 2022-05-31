export default (currentNoteId = null, action = {}) => {
    switch (action.type) {
        case 'SET_CURRENTNOTEID':
            return action.payload;
        default:
            return currentNoteId;
    }
};
