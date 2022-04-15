const headingReducer = (state = [], action) => {
    console.log('in headingReducer');
    
    switch (action.type) {
      case 'SET_HEADING_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  export default headingReducer;