import { combineReducers } from "redux";

const headingItemListReducer = (state = [], action) => {
    
    switch (action.type) {
      case 'SET_HEADING_ITEM_LIST':
        return action.payload;
      default:
        return state;
    }
  };

  const headingItemWithItemCodeReducer = (state = [], action) => {
    
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