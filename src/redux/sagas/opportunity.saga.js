import { put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {useSelector} from 'react-redux';


function* getOpportunities() {

    try{

        const response = yield axios.get('api/opportunity')

        yield put({type: 'SET_OPPORTUNITY', payload: response.data})

    }catch(error) {
        console.log('Getting oppotunities failed', error);
    }
}



function* opportunitySaga() {
    yield takeEvery('SET_OPPORTUNITY_LIST', getOpportunities)
}


export default opportunitySaga;