const itemReducer = (state = [], action) => {
    console.log('in itemReducer');
    
    switch (action.type) {
      case 'SET_ITEM_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  export default itemReducer;