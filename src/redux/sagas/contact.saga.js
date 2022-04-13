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

function* contactSaga() {
  yield takeLatest('FETCH_CONTACT_LIST', getContactList);
}

export default contactSaga;
