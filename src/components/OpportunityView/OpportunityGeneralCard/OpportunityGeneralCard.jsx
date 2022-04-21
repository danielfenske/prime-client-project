import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button, Select, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

// component imports
import ContactCard from './ContactCard';

function OpportunityGeneralCard() {
  const dispatch = useDispatch();
  const partners = useSelector((store) => store.partnerReducer.partnerReducer);
  const contacts = useSelector((store) => store.contactReducer);
  const { id } = useParams();
  const opportunity = useSelector(
    (store) => store.opportunityReducer.specificOpportunityReducer,
  );

  useEffect(() => {
    dispatch({
      type: 'FETCH_PARTNER_LIST',
    });
    dispatch({
      type: 'FETCH_CONTACT_LIST',
    });
    dispatch({
      type: 'FETCH_OPPORTUNITY',
      payload: id,
    });
  }, []);

  useEffect(() => {
    setName(opportunity.name);
    setOpportunityCode(opportunity.opportunity_code);

    if (opportunity.due_date) {
      const date = new Date(opportunity.due_date).toISOString().split('T')[0];

      setDueDate(date);
    }

    setStatus(opportunity.status || 1);
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
  const [opportunity_code, setOpportunityCode] = useState('');
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

  const [partner_id, setPartnerId] = useState(1);
  const [contact_id, setContactId] = useState(1);

  const handleSubmit = () => {
    console.log('user submitted the form');

    let opportunitySubmission = {
      id: opportunity.id,
      name: name,
      opportunity_code: opportunity_code,
      due_date: new Date(due_date).toISOString(),
      status: status,
      type: type,
      community_name: community_name,
      development_type: development_type,
      address_line_1: address_line_1,
      city: city,
      state: state,
      zip: zip,
      tax_rate: tax_rate,
    };

    // dispatch to UPDATE with new values
    dispatch({
      type: 'UPDATE_OPPORTUNITY',
      payload: opportunitySubmission,
    });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // API CODE
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('you hit enter');

      // Saga for the API
      dispatch({
        type: 'FETCH_CITY_STATE',
        payload: { zip: zip, opportunityId: opportunity.id },
      });
    }
  };

  return (
    <>
      <div className='card-header'>
        <div className='code-container'>
          <h1>Single Opportunity</h1>
          <span className='code'>
            <h3>{opportunity.opportunity_code}</h3>
          </span>
        </div>
        <Button onClick={handleSubmit} variant='contained' size='small'>
          Save Progress
        </Button>
      </div>
      <div className='card-body'>
        <div className='card-section'>
          <h2>General Information</h2>
          <div className='form-container'>
            <TextField
              id='outlined-basic'
              label='Opportunity Code'
              variant='outlined'
              value={opportunity_code}
              onChange={(e) => setOpportunityCode(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Opportunity Name'
              variant='outlined'
              value={name}
              onChange={(e) => setName(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            {/* <TextField
              id='outlined-basic'
              label='Status'
              type='number'
              variant='outlined'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              size='small'
              style={{ width: 200 }}
            /> */}

            <FormControl>
              <InputLabel id='status-label'>Status</InputLabel>
              <Select
                labelId='status-label'
                label='Status'
                variant='outlined'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                size='small'
                style={{ width: 200 }}
              >
                <MenuItem value={1}>In Progress</MenuItem>
                <MenuItem value={2}>Complete</MenuItem>
                <MenuItem value={3}>Archived</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id='date'
              label='Proposal Date'
              type='date'
              defaultValue='2022-04-16'
              value={due_date}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setDueDate(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Type'
              variant='outlined'
              value={type}
              onChange={(e) => setType(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Community Name'
              variant='outlined'
              value={community_name ? community_name : name}
              onChange={(e) => setCommunityName(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Development Type'
              variant='outlined'
              value={development_type}
              onChange={(e) => setDevelopmentType(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
          </div>
        </div>
        <div className='card-section'>
          <h2>Partner Information</h2>
          <div className='form-container'>
            {/* <PartnerCard partners={partners} />
            <ContactCard contacts={contacts} /> */}
            <FormControl>
              <InputLabel id='demo-simple-select-label'>Partner</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Method'
                value={partner_id}
                onChange={(e) => setPartnerId(e.target.value)}
                size='small'
                style={{ width: 200 }}
              >
                <MenuItem value={1}>Heather</MenuItem>
                <MenuItem value={2}>Dan</MenuItem>
                <MenuItem value={3}>Dave</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id='demo-simple-select-label'>Contact</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Contact'
                value={contact_id}
                onChange={(e) => setContactId(e.target.value)}
                size='small'
                style={{ width: 200 }}
              >
                <MenuItem value={1}>Mark</MenuItem>
                <MenuItem value={2}>Dave</MenuItem>
                <MenuItem value={3}>Cam</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
          <div className='card-section'>
            <h2>Opportunity Type</h2>
            <div className='form-container'>
              <TextField
                id='outlined-basic'
                label='Zip'
                type='number'
                variant='outlined'
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                onKeyPress={handleKeyPress}
                size='small'
                style={{ width: 200 }}
              />
              <TextField
                id='outlined-basic'
                label='City'
                variant='outlined'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                size='small'
                style={{ width: 200 }}
              />
              <TextField
                id='outlined-basic'
                label='State'
                variant='outlined'
                value={state}
                onChange={(e) => setState(e.target.value)}
                size='small'
                style={{ width: 200 }}
              />
              <TextField
                id='outlined-basic'
                label='Address'
                variant='outlined'
                value={address_line_1}
                onChange={(e) => setAddress(e.target.value)}
                size='small'
                style={{ width: 200 }}
              />
              <TextField
                id='outlined-basic'
                label='Tax Rate'
                type='number'
                variant='outlined'
                value={tax_rate}
                onChange={(e) => setTaxRate(e.target.value)}
                size='small'
                style={{ width: 200 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// function PartnerCard({ partners }) {
//   const [partnerSelect, setPartnerSelect] = useState(-1);
//   const [partnerInfo, setPartnerInfo] = useState(null);

//   useEffect(() => {
//     console.log(partnerSelect);
//     if (partnerSelect === -1) {
//       setPartnerInfo(null);
//     } else {
//       setPartnerInfo(partners.filter((p) => p.id == partnerSelect)[0]);
//     }
//   }, [partnerSelect]);

//   return (
//     <>
//       <div>
//         <select
//           value={partnerSelect}
//           onChange={(e) => setPartnerSelect(e.target.value)}
//         >
//           <option value={-1}>none</option>
//           {partners.map((partner, index) => {
//             return (
//               <option key={index} value={partner.id}>
//                 {partner.name}
//               </option>
//             );
//           })}
//         </select>

//         {partnerInfo && <span>{JSON.stringify(partnerInfo)}</span>}
//       </div>
//     </>
//   );
// }

export default OpportunityGeneralCard;
