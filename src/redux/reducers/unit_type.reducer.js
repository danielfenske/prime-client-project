const unitTypeReducer = (state = [], action) => {
    console.log('in unitTypeReducer');
    
    switch (action.type) {
      case 'SET_UNIT_TYPE_PAIR':
        return action.payload;
      default:
        return state;
    }
  };


export default unitTypeReducer;
 
  