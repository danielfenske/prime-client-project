import { combineReducers } from "redux";

const singleUnitTypeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_UNIT_TYPE_PAIR':
        return action.payload;
      default:
        return state;
    }
  };

const unitTypeListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_UNIT_TYPE_LIST':
        return [{},...action.payload];
      default:
        return state;
    }
  };

export default combineReducers({
  singleUnitTypeReducer,
  unitTypeListReducer,
  });

 
  