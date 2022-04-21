import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//fetch all headings per proposal
function* getHeadingList(action) {
    try {
        console.log('in getHeadingList saga, action.payload is', action.payload);
        
        const headingResponse = yield axios.get(`/api/heading/${action.payload}`);
        console.log('in headingSaga getHeadingList, headingResponse is', headingResponse);
        

    //send all headings to be stored in the heading reducer
    yield put({type:'SET_HEADING_LIST', payload: headingResponse.data })
    } catch (error) {
        console.log('Error GETTing headings', error);
    }
}

//post a new heading to DB
function* postHeading (action) {
    console.log('in headingSaga postHeading, action.payload is', action.payload);
    
    try {
        yield axios.post(`/api/heading`, action.payload);
        yield put({type:'FETCH_HEADING_LIST', payload: action.payload.proposal_id});
    } catch (error) {
        console.log('Error POSTing a new heading', error);
    }
}

//update a heading
function* updateHeading (action) {
    console.log('in headingSaga updateHeading, action.payload is', action.payload);
    
    try {
        yield axios.put(`/api/heading/${action.payload.heading_id}`, action.payload);
        yield put({type:'FETCH_HEADING_LIST', payload: action.payload.proposal_id});
    } catch (error) {
        console.log('Error UPDATing a heading', error);
    }
}

//delete a heading
function* deleteHeading (action) {
    console.log('in headingSaga deleteHeading');
    
    try {
        yield axios.delete(`/api/heading/${action.payload.heading_id}`);
        yield put({type:'FETCH_HEADING_LIST', payload: action.payload.proposal_id});
    } catch (error) {
        console.log('Error DELETing a heading', error);
    }
}


function* headingSaga() {
    yield takeLatest('FETCH_HEADING_LIST', getHeadingList);
    yield takeLatest('POST_HEADING', postHeading);
    yield takeLatest('UPDATE_HEADING', updateHeading);
    yield takeLatest('DELETE_HEADING', deleteHeading);
  }

export default headingSaga;