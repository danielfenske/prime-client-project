import { put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getCityState(action) {
    try{

        const zip = action.payload.zip
        const opportunityId = action.payload.opportunityId;
        // make a GET and set the reducer with the data from the GET
        yield axios.get(`/api/zip/${zip}/${opportunityId}`)
        // GET for the specific opportunity
        yield put({type: 'FETCH_OPPORTUNITY', payload: opportunityId});

    }catch(error) {
        console.log('error using API', error);
    }
}


function* zipCodeApiSaga() {
    yield takeLatest('FETCH_CITY_STATE', getCityState);
}



export default zipCodeApiSaga;