import { combineReducers } from "redux";

const partnerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTNER_LIST': 
            return action.payload;
        default:
            return state;
    }
}
const partnerEditReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EDIT_PARTNER': 
            return action.payload;
        default:
            return state;
    }
}
export default combineReducers({
    partnerReducer,
    partnerEditReducer,
})