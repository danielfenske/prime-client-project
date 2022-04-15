import { combineReducers } from 'redux';


// opportunity reducer

const opportunityReducer = (state = [], action) => {
    if (action.type === 'SET_OPPORTUNITY') {
        return action.payload;
    } else return state;
}


export default combineReducers({
    opportunityReducer,
})