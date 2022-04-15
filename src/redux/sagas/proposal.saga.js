import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GETs list of all proposals
function* getProposalList() {    
  try {
      const proposalResponse = yield axios.get(`/api/proposal`);

    // sends list to be stored in redux state
    yield put ({type: 'SET_PROPOSAL_LIST', payload: proposalResponse.data});

  } catch (error) {
      console.log('Error GETTING contacts', error); 
  }
}

// GETs specific proposal
function* getProposal(action) {
    const opportunityId = action.payload.opportunity_id;
    const proposalId = action.payload.id;

    try {
        const proposalResponse = yield axios.get(`/api/proposal/${opportunityId}/${proposalId}`);
  
      // sends proposal to be stored in redux state
      yield put ({type: 'SET_PROPOSAL', payload: proposalResponse.data});
  
    } catch (error) {
        console.log('Error GETTING proposal', error); 
    }
}

// POST new contact to DB
function* postProposal(action) {
  const opportunityId = action.payload.opportunity_id;

  try {
    yield axios.post(`api/proposal/${opportunityId}`);

    yield put({type: 'FETCH_PROPOSAL'});
  } catch (error) {
    console.log('Error POSTING contact', error);   
  }
}

// UPDATE existing proposal within DB
function* updateProposal(action) {

  const proposalId = action.payload.id;
  const updatedProposal = action.payload;

  try {
    yield axios.put(`api/proposal/${proposalId}`, updatedProposal);

    yield put({type: 'FETCH_PROPOSAL'});
  } catch (error) {
    console.log('Error UPDATING proposal', error);
  }
}

function* proposalSaga() {
  yield takeLatest('FETCH_PROPOSAL_LIST', getProposalList);
  yield takeLatest('FETCH_PROPOSAL', getProposal);
  yield takeLatest('POST_PROPOSAL', postProposal);
  yield takeLatest('UPDATE_PROPOSAL', updateProposal);
}

export default proposalSaga;
