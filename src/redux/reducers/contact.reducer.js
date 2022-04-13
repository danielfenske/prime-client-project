
// stores all contacts from database
const contactReducer = (state=[], action) => {
    if (action.type === 'SET_CONTACT_LIST') {
        return action.payload;
    } 
    return state;
}

export default contactReducer;