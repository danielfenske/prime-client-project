function proposalEverything(state = [], action) {

  if (action.type === 'SET_PROPOSAL_EVERYTHING') {
    return action.payload;
  }

  return state;
}

export default proposalEverything;