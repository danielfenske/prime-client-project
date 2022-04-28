import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GETs list of all contacts held in DB
function* getContactList() {
  try {
    const contactResponse = yield axios.get(`/api/contact`);

    // sends list to be stored in redux state
    yield put({ type: 'SET_CONTACT_LIST', payload: contactResponse.data });

  } catch (error) {
    console.log('Error GETTING contacts', error);
  }
}

function* getOneContact(action) {
  try {
    const res = yield axios.get(`/api/contact/one/${action.payload}`)

    yield put({
      type: 'SET_EDIT_CONTACT',
      payload: res.data[0],
    })
  } catch (err) {
    console.error('Error getting one contact', err);
  }
}

// POST new contact to DB
function* postContact(action) {
  const newContact = action.payload;

  try {
    yield axios.post(`api/contact`, newContact);

    yield put({ type: 'FETCH_CONTACT_LIST' });
  } catch (error) {
    console.log('Error POSTING contact', error);
  }
}

// UPDATE existing contact within DB
function* updateContact(action) {

  const contactId = action.payload.id;
  const updatedContact = action.payload;
  const opportunityId = action.payload.opportunityId;

  try {
    yield axios.put(`api/contact/${contactId}`, updatedContact);

    yield put({ type: 'FETCH_CONTACT_LIST' });
    yield put({type: 'FETCH_ONE_CONTACT', payload: contactId});
    yield put({type: 'FETCH_OPPORTUNITY', payload: opportunityId});

  } catch (error) {
    console.log('Error UPDATING contact', error);
  }
}

function* contactSaga() {
  yield takeLatest('FETCH_CONTACT_LIST', getContactList);
  yield takeLatest('POST_CONTACT', postContact);
  yield takeLatest('UPDATE_CONTACT', updateContact);
  yield takeLatest('FETCH_ONE_CONTACT', getOneContact);
}

export default contactSaga;
