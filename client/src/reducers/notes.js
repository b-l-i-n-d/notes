export default (notes = [], action = {}) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE': {
            return [action.payload, ...notes];
        }
        case 'UPDATE':
            return notes.map((note) => (note.id === action.payload.id ? action.payload : note));
        default:
            return notes;
    }
};
