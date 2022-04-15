import { combineReducers } from 'redux';

const proposalListReducer = (state=[], action) => {
    if (action.type === 'SET_PROPOSAL_LIST') {
        return action.payload;
    }
    return state;
}

const singleProposalReducer = (state={}, action) => {
    if (action.type === 'SET_PROPOSAL') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    proposalListReducer,
    singleProposalReducer,
  });
  