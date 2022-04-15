import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//fetch all unit_types
function* getUnitTypeList() {
    try {
        const unitTypeResponse = yield axios.get(`/api/unit_type`);
        console.log('in unitTypeSaga getUnitTypeList, unitTypeResponse is', unitTypeResponse);
        

    //send all unit_type pairs to be stored in the unit_type reducer
    yield put({type:'SET_UNIT_TYPE_LIST', payload: unitTypeResponse.data })
    } catch (error) {
        console.log('Error GETTing unit_types', error);
    }
}

//post a new item to DB
function* postItem (action) {
    console.log('in itemSaga postItem, action.payload is', action.payload);
    
    try {
        yield axios.post(`/api/item`, action.payload);
        yield put({type:'FETCH_ITEM_LIST'});
    } catch (error) {
        console.log('Error POSTing a new item', error);
    }
}




function* itemSaga() {
    yield takeLatest('FETCH_ITEM_LIST', getItemList);
    yield takeLatest('POST_ITEM', postItem);
  }

export default itemSaga;