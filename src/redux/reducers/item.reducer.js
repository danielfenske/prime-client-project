const itemReducer = (state = [], action) => {
    
    switch (action.type) {
      case 'SET_ITEM_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  export default itemReducer;