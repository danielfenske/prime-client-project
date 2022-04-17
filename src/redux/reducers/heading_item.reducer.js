import { combineReducers } from "redux";

const headingItemListReducer = (state = [], action) => {
    console.log('in headingItemReducer');
    
    switch (action.type) {
      case 'SET_HEADING_ITEM_LIST':
        return action.payload;
      default:
        return state;
    }
  };

  const headingItemWithItemCodeReducer = (state = [], action) => {
    console.log('in headingItemWithItemCodeReducer');
    
    switch (action.type) {
      case 'SET_HEADING_ITEM_WITH_ITEM_CODE_LIST':
        return action.payload;
      default:
        return state;
    }
  };


  export default combineReducers({
    headingItemListReducer,
    headingItemWithItemCodeReducer,
    });