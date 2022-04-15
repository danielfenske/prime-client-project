import { combineReducers } from "redux";

const partnerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARTNER_LIST': 
            return action.payload;
        default:
            return state;
    }
}
export default combineReducers({
    partnerReducer,
})