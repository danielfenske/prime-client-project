import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GETs list of all contacts held in DB
function* getContactList() {    
  try {
      const contactResponse = yield axios.get(`/api/contact`);

    // sends list to be stored in redux state
    yield put ({type: 'SET_CONTACT_LIST', payload: contactResponse.data});

  } catch (error) {
      console.log('Error GETTING contacts', error); 
  }
}

// POST new contact to DB
function* postContact(action) {
  const newContact = action.payload;

  try {
    yield axios.post(`api/contact`, newContact);

    yield put({type: 'FETCH_CONTACT_LIST'});
  } catch (error) {
    console.log('Error POSTING contact', error);   
  }
}

// UPDATE existing contact within DB
function* updateContact(action) {

  const contactId = action.payload.id;
  const updatedContact = action.payload;

  try {
    yield axios.put(`api/contact/${contactId}`, updatedContact);

    yield put({type: 'FETCH_CONTACT_LIST'});
  } catch (error) {
    console.log('Error UPDATING contact', error);
  }
}

function* contactSaga() {
  yield takeLatest('FETCH_CONTACT_LIST', getContactList);
  yield takeLatest('POST_CONTACT', postContact);
  yield takeLatest('UPDATE_CONTACT', updateContact);
}

export default contactSaga;
