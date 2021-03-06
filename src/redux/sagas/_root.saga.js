import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import contactSaga from './contact.saga';
import partnerSaga from './partner.saga';
import itemSaga from './item.saga';
import headingSaga from './heading.saga';
import headingItemSaga from './heading_item.saga';
import unitTypeSaga from './unit_type.saga';
import proposalSaga from './proposal.saga';
import opportunitySaga from './opportunity.saga';
import proposalEverythingSaga from './proposalEverything.saga';
import zipCodeSaga from './zip_code.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    contactSaga(),
    partnerSaga(),
    itemSaga(),
    headingSaga(),
    proposalSaga(),
    opportunitySaga(),
    headingItemSaga(),
    unitTypeSaga(),
    proposalEverythingSaga(),
    zipCodeSaga(),
  ]);
}
