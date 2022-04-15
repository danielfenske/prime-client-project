const unitTypeListReducer = (state = [], action) => {
    console.log('in unitTypeListReducer');
    
    switch (action.type) {
      case 'SET_UNIT_TYPE_LIST':
        return [{},...action.payload];
      default:
        return state;
    }
  };

export default unitTypeListReducer;