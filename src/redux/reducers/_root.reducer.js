import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import allUsers from './admin.reducer';
import contactReducer from './contact.reducer';
import partnerReducer from './partner.reducer';
import itemReducer from './item.reducer';
import headingReducer from './heading.reducer';
import headingItemReducer from './heading_item.reducer';
import unitTypeReducer from './unit_type.reducer';
import proposalReducer from './proposal.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  allUsers,
  contactReducer,
  partnerReducer,
  itemReducer,
  proposalReducer,
  headingReducer,
  headingItemReducer,
  unitTypeReducer,
});

export default rootReducer;
