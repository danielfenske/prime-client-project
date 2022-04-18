import { put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {useSelector} from 'react-redux';


// GET all opportunities
function* getOpportunitiesList() {
    try{

        const response = yield axios.get('/api/opportunity')

        yield put({type: 'SET_OPPORTUNITY_LIST', payload: response.data})

    }catch(error) {
        console.log('Getting opportunities failed', error);
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
    const opportunityId = action.payload.id;
    const updatedOpportunity = action.payload;

    try{
        yield axios.put(`/api/opportunity/${opportunityId}`, updatedOpportunity)

        yield put({type: 'FETCH_OPPORTUNITY', payload: opportunityId})
    }catch(error) {
        console.log('error UPDATING opportunity', error);
    }

}

function* postOpportunity(){
    try{
        const opportunityResponse = yield axios.post(`/api/opportunity`)

        const opportunityId = opportunityResponse.data.opportunity_id;
        yield put({type: 'FETCH_OPPORTUNITY', payload: opportunityId});
        yield put({type: 'FETCH_OPPORTUNITY_LIST'});
        
    }catch(error) {
        console.log('error posting Opportunity', error);
        
    }
}

// DELETE (disable) existing opportunity within DB
function* deleteOpportunity(action) {
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
    yield takeLatest('DELETE_OPPORTUNITY', deleteOpportunity);
    yield takeLatest('POST_OPPORTUNITY', postOpportunity);
    yield takeLatest('UPDATE_OPPORTUNITY', updateOpportunity);
}


export default opportunitySaga;