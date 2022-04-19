const headingReducer = (state = [], action) => {
    
    switch (action.type) {
      case 'SET_HEADING_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  export default headingReducer;