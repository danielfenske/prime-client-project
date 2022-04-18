import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function OpportunityGeneralCard() {
  const dispatch = useDispatch();
  const partners = useSelector((store) => store.partnerReducer.partnerReducer);
  const contacts = useSelector((store) => store.contactReducer);
  const { id } = useParams();
  const opportunity = useSelector((store) => store.opportunityReducer.specificOpportunityReducer);

  useEffect(() => {
    dispatch({
      type: 'FETCH_PARTNER_LIST',
    });
    dispatch({
      type: 'FETCH_CONTACT_LIST',
    });
    dispatch({
      type: 'FETCH_OPPORTUNITY',
      payload: id
    })
  }, []);

  useEffect(() => {

    setName(opportunity.name);
    setDueDate(opportunity.due_date);
    setStatus(opportunity.status);
    setType(opportunity.type);
    setCommunityName(opportunity.community_name);
    setDevelopmentType(opportunity.development_type);
    setAddress(opportunity.address_line_1);
    setCity(opportunity.city);
    setState(opportunity.state);
    setZip(opportunity.zip);
    setTaxRate(opportunity.tax_rate);
  }, [opportunity]);


  const [name, setName] = useState('');
  const [due_date, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [community_name, setCommunityName] = useState('');
  const [development_type, setDevelopmentType] = useState('');
  const [address_line_1, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [tax_rate, setTaxRate] = useState('');


  const handleSubmit = () => {
    console.log('user submitted the form');

    let opportunitySubmission = {
      id: opportunity.id,
      name: name,
      due_date: due_date,
      status: status,
      type: type,
      community_name: community_name,
      development_type: development_type,
      address_line_1: address_line_1,
      city: city,
      state: state,
      zip: zip,
      tax_rate: tax_rate
    }

    // dispatch to UPDATE with new values
    dispatch({
      type: 'UPDATE_OPPORTUNITY',
      payload: opportunitySubmission
    })
  }


  return (
    <>
      <div>
        <h2>General Information</h2>
        <TextField
          id='outlined-basic'
          label='Opportunity Name'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
          size='small'
        />
        <TextField
          id='outlined-basic'
          label='Status'
          type="number"
          variant='outlined'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          size='small'
        />
        <TextField
          id='date'
          label='Proposal Date'
          type='date'
          defaultValue='2022-04-16'
          value={due_date}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setDueDate(e.target.value)}
          size='small'
        />
        <TextField
          id='outlined-basic'
          label='Type'
          variant='outlined'
          value={type}
          onChange={(e) => setType(e.target.value)}
          size='small'
        />
        <TextField
          id='outlined-basic'
          label='Community Name'
          variant='outlined'
          value={community_name}
          onChange={(e) => setCommunityName(e.target.value)}
          size='small'
        />
        <TextField
          id='outlined-basic'
          label='Development Type'
          variant='outlined'
          value={development_type}
          onChange={(e) => setDevelopmentType(e.target.value)}
          size='small'
        />
      </div>
      <div>
        <h2>Partner Information</h2>
        <PartnerCard partners={partners} />
        <ContactCard contacts={contacts} />
      </div>
      <div>
        <h2>Opportunity Type</h2>
        <TextField
          id='outlined-basic'
          label='Zip'
          type="number"
          variant='outlined'
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          size='small'
        />
        <TextField
          id='outlined-basic'
          label='City'
          variant='outlined'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          size='small'
        />
        <TextField
          id='outlined-basic'
          label='State'
          variant='outlined'
          value={state}
          onChange={(e) => setState(e.target.value)}
          size='small'
        />
        <TextField
          id='outlined-basic'
          label='Address'
          variant='outlined'
          value={address_line_1}
          onChange={(e) => setAddress(e.target.value)}
          size='small'
        />
        <TextField
          id='outlined-basic'
          label='Tax Rate'
          type='number'
          variant='outlined'
          value={tax_rate}
          onChange={(e) => setTaxRate(e.target.value)}
          size='small'
        />
        <Button onClick={handleSubmit} variant='contained' size='small'>
          Save Progress
        </Button>
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

export default OpportunityGeneralCard;
