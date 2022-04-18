import { UpdateOutlined } from '@mui/icons-material';
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//fetch all heading_items(line items)
function* getHeadingItemList(action) {
    try {
        const headingItemResponse = yield axios.get(`/api/heading/${action.payload}/item`);
        console.log('in headingItemSaga getHeadingItemList, headingItemResponse is', headingItemResponse);


        //send all heading_items to be stored in the heading_item reducer
        yield put({ type: 'SET_HEADING_ITEM_LIST', payload: headingItemResponse.data })
    } catch (error) {
        console.log('Error GETTing heading_items', error);
    }
}

//fetch all heading_items along with item code and related data 
function* getHeadingItemWithItemCode() {
    try {
        console.log('in headingItemItemCodeList saga');
        
        const response = yield axios.get(`/api/heading/item_with_item_code`);
        console.log('in headingItemItemCodeList saga response is', response);

        yield put({ type: 'SET_HEADING_ITEM_WITH_ITEM_CODE_LIST', payload: response.data })
    } catch (error) {
        console.log('Error GETTing heading_items_with_item_code', error);
    }
}

//post a new heading_item to DB
function* postHeadingItem(action) {
    console.log('in headingItemSaga postHeadingItem, action.payload is', action.payload);
    
    try { 
        yield axios.post(`/api/heading/${action.payload}/item`);
        yield put({ type: 'FETCH_HEADING_ITEMS_WITH_ITEM_CODE', payload: action.payload });
    } catch (error) {
        console.log('Error POSTing a new heading', error);
    }
}

//update a heading_item
function* updateHeadingItem(action) {
    console.log('in headingItemSaga updateHeadingItem, action.payload is', action.payload);

    try {
        yield axios.put(`/api/heading/item/${action.payload.heading_item_id}`, action.payload);
        yield put({ type: 'FETCH_HEADING_ITEMS_WITH_ITEM_CODE' });
    } catch (error) {
        console.log('Error UPDATing a heading_item_item_code', error);
    }
}

//update item code in a heading_item
function* updateHeadingItemItemCode(action) {
    console.log('in headingItemSaga updateHeadingItemItemCode, action.payload is', action.payload);

    try {
        yield axios.put(`/api/heading/item/item_code`, action.payload);
        yield put({ type: 'FETCH_HEADING_ITEMS_WITH_ITEM_CODE' });
    } catch (error) {
        console.log('Error UPDATing a heading_item', error);
    }
}
//delete a heading_item
function* deleteHeadingItem(action) {
    console.log('in headingItemSaga deleteHeadingItem');

    try {
        yield axios.put(`/api/heading/item/${action.payload.id}`);
        yield put({ type: 'FETCH_HEADING_ITEMS_WITH_ITEM_CODE' });
    } catch (error) {
        console.log('Error DELETing a heading_item', error);
    }
}




function* headingItemSaga() {
    yield takeLatest('FETCH_HEADING_ITEM_LIST', getHeadingItemList);
    yield takeLatest('POST_HEADING_ITEM', postHeadingItem);
    yield takeLatest('UPDATE_HEADING_ITEM_ITEM_CODE', updateHeadingItemItemCode);
    yield takeLatest('UPDATE_HEADING_ITEM', updateHeadingItem);
    yield takeLatest('DELETE_HEADING_ITEM', deleteHeadingItem);
    yield takeLatest('FETCH_HEADING_ITEMS_WITH_ITEM_CODE', getHeadingItemWithItemCode);
}

export default headingItemSaga;