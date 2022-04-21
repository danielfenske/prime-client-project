import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* proposal(action) {
  try {
    const response = yield axios.get(`/api/proposal/everything/${action.payload}`)

    yield put({
      type: 'SET_PROPOSAL_EVERYTHING',
      payload: response.data,
    })
  } catch (err) {
    console.error('Error in proposalEverything.saga', err);
  }
}

function* proposalEverythingSaga() {
  yield takeLatest('GET_PROPOSAL_EVERYTHING', proposal);
}

export default proposalEverythingSaga;