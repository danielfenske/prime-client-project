const headingItemReducer = (state = [], action) => {
    console.log('in headingItemReducer');
    
    switch (action.type) {
      case 'SET_HEADING_ITEM_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  export default headingItemReducer;