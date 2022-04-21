import { combineReducers } from "redux";

// stores all contacts from database
const contactReducer = (state=[], action) => {
    if (action.type === 'SET_CONTACT_LIST') {
        return action.payload;
    } 
    return state;
}
const contactEditReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EDIT_CONTACT': 
            return action.payload;
        case 'SET_CLEAR_EDIT_CONTACT':
            return [];   
        default:
            return state;
    }
}
// export default contactReducer;
export default combineReducers({
    contactReducer,
    contactEditReducer,
})