import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets a list partners from the partners table in the database
function* getPartnerRows() {    
    try {
        const partnerList= yield axios.get(`/api/partner`);
        yield put ({type: 'SET_PARTNER_LIST', payload: partnerList.data});
  
    } catch (error) {
        console.log('rut ro scoob!', error); 
    }
  }



function* partnerSaga() {
    yield takeLatest('FETCH_PARTNER_LIST', getPartnerRows);
    // yield takeLatest('POST_PARTNER', postPartner);
    // yield takeLatest('UPDATE_PARTNER', updatePartner);
  }

export default partnerSaga;