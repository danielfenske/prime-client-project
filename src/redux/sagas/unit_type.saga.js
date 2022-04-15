import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//fetch all unit_types
function* getUnitTypeList() {
    try {
        const unitTypeListResponse = yield axios.get(`/api/unit_type`);
        console.log('in unitTypeSaga getUnitTypeList, unitTypeResponse is', unitTypeListResponse);
        

    //send all unit_type pairs to be stored in the unit_type_list reducer
    yield put({type:'SET_UNIT_TYPE_LIST', payload: unitTypeListResponse.data })
    } catch (error) {
        console.log('Error GETTing unit_type list', error);
    }
}

//fetch one unit_type pair for an item
function* getUnitTypePair () {
    console.log('in unitTypeSaga getUnitTypePair, action.payload is', action.payload);
    
    try {
        const unitTypePairResponse = yield axios.get(`/api/unit_type/${action.payload.item_id}`);
        console.log('in unitTypeSaga getUnitTypeList, unitTypeResponse is', unitTypePairResponse);
        

    //send the unit_type pair to be stored in the unit_type reducer
    yield put({type:'SET_UNIT_TYPE_PAIR', payload: unitTypePairResponse.data })
    } catch (error) {
        console.log('Error GETTing unit_type pair', error);
    }
}


function* unitTypeSaga() {
    yield takeLatest('FETCH_UNIT_TYPE_LIST', getUnitTypeList);
    yield takeLatest('FETCH_UNIT_TYPE_PAIR', getUnitTypePair);
  }

export default unitTypeSaga;