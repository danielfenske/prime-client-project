const allUsers = (state = [], action) => {

  if (action.type === 'SET_ALL_USERS') {
    // set the allUsers reducer to the payload
    return action.payload;
  }

  return state;
}

export default allUsers;