import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//fetch all items
function* getItemList() {
    try {
        const itemResponse = yield axios.get(`/api/item`);
        console.log('itemResponse is', itemResponse);
        

    //send all items to be stored in the item reducer
    yield put({type:'SET_ITEM_LIST', payload: itemResponse.data })
    } catch (error) {
        console.log('Error GETTing items', error);
    }
}

//post a new item to DB
function* postItem (action) {
    const newItem = action.payload;

    try {
        yield axios.post(`/api/item`, newItem);
        yield put({type:'FETCH_ITEM_LIST'});
    } catch (error) {
        console.log('Error POSTing a new item', error);
    }
}




function* itemSaga() {
    yield takeLatest('FETCH_ITEM_LIST', getItemList);
    yield takeLatest('POST_ITEM', postItem)
  }

export default itemSaga;