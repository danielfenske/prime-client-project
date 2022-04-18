import { put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {useSelector} from 'react-redux';


// GET all opportunities
function* getOpportunitiesList() {
    try{

        const response = yield axios.get('/api/opportunity')

        yield put({type: 'SET_OPPORTUNITY_LIST', payload: response.data})

    }catch(error) {
        console.log('Getting oppotunities failed', error);
    }
}

// GET specific opportunity
function* getOpportunity(action) {

    const opportunity_id = action.payload;

    try{
        const response = yield axios.get(`/api/opportunity/${opportunity_id}`);

        // set off reducer here
        yield put({type: 'SET_OPPORTUNITY', payload: response.data})

    }catch(error) {
        console.log('error getting specific opportunity ', error);
    }
}

// UPDATE opportunity
function* updateOpportunity(action) {
    const opportunity_id = action.payload.opportunity_id;

    try{
        const response = yield axios.put(`/api/opportunity/${opportunity_id}`)

        // set off reducer here
    }catch(error) {
        console.log('error UPDATING opportunity', error);
    }

}

function* postOpportunity(){
    try{
        const response = yield axios.post(`/api/opportunity`)

        // set off reducer here
    }catch(error) {
        console.log('error posting Opportunity', error);
        
    }
}

// DELETE (disable) existing opportunity within DB
function* deleteSaga(action) {
    const id = action.payload;
  
    try {
      yield axios.delete(`api/opportunity/${id}`);
  
      yield put({type: 'FETCH_OPPORTUNITY_LIST'});
    } catch (error) {
      console.log('Error DELETING proposal', error);
      
    }
  }


function* opportunitySaga() {
    yield takeLatest('FETCH_OPPORTUNITY_LIST', getOpportunitiesList),
    yield takeLatest('FETCH_OPPORTUNITY', getOpportunity),
    yield takeLatest('DELETE_SAGA', deleteSaga);
}


export default opportunitySaga;