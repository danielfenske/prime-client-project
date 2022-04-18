import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function OpportunityGeneralCard() {
  const dispatch = useDispatch();
  const partners = useSelector((store) => store.partnerReducer.partnerReducer);
  const contacts = useSelector((store) => store.contactReducer);

  useEffect(() => {
    dispatch({
      type: 'FETCH_PARTNER_LIST',
    });
    dispatch({
      type: 'FETCH_CONTACT_LIST',
    });
  }, []);

  return (
    <>
      <div>
        <h2>This is the Proposal General Information</h2>
      </div>
      <div>
        <h2>Partner Information</h2>
        <PartnerCard partners={partners} />
        <ContactCard contacts={contacts} />
      </div>
      <div>
        <h2>Opportunity Type</h2>
      </div>
    </>
  );
}

function PartnerCard({ partners }) {
  const [partnerSelect, setPartnerSelect] = useState(-1);
  const [partnerInfo, setPartnerInfo] = useState(null);

  useEffect(() => {
    console.log(partnerSelect);
    if (partnerSelect === -1) {
      setPartnerInfo(null);
    } else {
      setPartnerInfo(partners.filter((p) => p.id == partnerSelect)[0]);
    }
  }, [partnerSelect]);

  return (
    <>
      <div>
        <select
          value={partnerSelect}
          onChange={(e) => setPartnerSelect(e.target.value)}
        >
          <option value={-1}>none</option>
          {partners.map((partner, index) => {
            return (
              <option key={index} value={partner.id}>
                {partner.name}
              </option>
            );
          })}
        </select>

        {partnerInfo && <span>{JSON.stringify(partnerInfo)}</span>}
      </div>
    </>
  );
}

function ContactCard({ contacts }) {
  const [contactSelect, setContactSelect] = useState(-1);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    console.log(contactSelect);
    if (contactSelect === -1) {
      setContactInfo(null);
    } else {
      setContactInfo(contacts.filter((p) => p.id == contactSelect)[0]);
    }
  }, [contactSelect]);

  return (
    <>
      <div>
        <select
          value={contactSelect}
          onChange={(e) => setContactSelect(e.target.value)}
        >
          <option value={-1}>none</option>
          {contacts.map((partner, index) => {
            return (
              <option key={index} value={partner.id}>
                {partner.name}
              </option>
            );
          })}
        </select>

        {contactInfo && <span>{JSON.stringify(contactInfo)}</span>}
      </div>
    </>
  );
}
