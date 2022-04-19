import { combineReducers } from 'redux';


// opportunity reducer

const opportunityListReducer = (state = [], action) => {
    if (action.type === 'SET_OPPORTUNITY_LIST') {
        return action.payload;
    } else return state;
}

const specificOpportunityReducer = (state = {}, action) => {
    if (action.type === 'SET_OPPORTUNITY') {
        return action.payload;
    }else return state;
}




export default combineReducers({
    opportunityListReducer,
    specificOpportunityReducer
})