import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Select, MenuItem } from '@mui/material';

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
        <Select
          value={contactSelect}
          onChange={(e) => setContactSelect(e.target.value)}
          size='small'
        >
          <MenuItem value={-1}>none</MenuItem>
          {contacts.map((partner, index) => {
            return (
              <MenuItem key={index} value={partner.id}>
                {partner.name}
              </MenuItem>
            );
          })}
        </Select>
        <div>
          {contactInfo && (
            <>
              <p>Name: {contactInfo?.name}</p>
              <p>Phone: {contactInfo?.phone}</p>
              <p>Work Phone: {contactInfo?.work_phone}</p>
              <p>Email: {contactInfo?.email}</p>
            </>
          )}
        </div>
        <div>
          <IconButton>
            <AddIcon />
          </IconButton>
          {contactInfo && (
            <IconButton>
              <EditIcon />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
}

export default OpportunityGeneralCard;
