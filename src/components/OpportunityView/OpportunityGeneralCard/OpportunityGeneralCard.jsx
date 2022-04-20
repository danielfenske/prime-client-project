import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

import EditContactModal from './EditContactModal/EditContactModal';
import AddContactModal from './AddContactModal/AddContactModal';
import AddPartnerModal from './EditPartnerModal/EditPartnerModal';
import EditPartnerModal from './EditPartnerModal/EditPartnerModal';
// component imports
import ContactCard from './ContactCard';

function OpportunityGeneralCard() {
  const dispatch = useDispatch();
  const partners = useSelector((store) => store.partnerReducer.partnerReducer);
  const editablePartner = useSelector((store) => store.partnerReducer.partnerEditReducer);
  const contacts = useSelector((store) => store.contactReducer);
  const { id } = useParams();
  const opportunity = useSelector((store) => store.opportunityReducer.specificOpportunityReducer);

  useEffect(() => {
    // dispatch({
    //   type: 'FETCH_PARTNER_LIST',
    // });
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

  // partner use states
  const [partnerType, setPartnerType] = useState("");
  const [partnerPhoneNumber, setPartnerPhoneNumber] = useState("");

  // contact use states 
  const [contactName, setContactName] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');


  const [partner_id, setPartnerId] = useState(1);
  const [contact_id, setContactId] = useState(1);

  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnereditModalOpen, setPartnerEditModalOpen] = useState(false);

  const handleEditPartner = (thisPartner) => {
    dispatch({ type: 'SET_EDIT_PARTNER', payload: thisPartner });
  }
  const handlePartnerAdd = () => {
    setPartnerModalOpen(true);
    // somehow access the modal here
  }
  const handlePartnerEdit = () => {
    setPartnerEditModalOpen(true);
    // somehow accesss the edit modal here

  }
  const handleSubmit = () => {
    console.log('user submitted the form');

    let opportunitySubmission = {
      id: opportunity.id,
      name: name,
      opportunity_code: opportunity_code,
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // API CODE             
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('you hit enter');

      // Saga for the API
      dispatch({
        type: 'FETCH_CITY_STATE',
        payload: { zip: zip, opportunityId: opportunity.id }
      });
    }
  }

  return (
    <>
      <div className='card-header'>
        <div className="code-container">
          <h1>Single Opportunity</h1>
          <span className="code"><h3>{opportunity.opportunity_code}</h3></span>
        </div>
        <Button onClick={handleSubmit} variant='contained' size='small'>
          Save Progress
        </Button>
      </div>
      <div className="card-body">
        <div className="card-section">
          <h2>General Information</h2>
          <div className="form-container">
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
            <TextField
              id='outlined-basic'
              label='Status'
              type="number"
              variant='outlined'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              size='small'
              style={{ width: 200 }}
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
        <div className="card-section">
          <h2>Partner Information</h2>
          <div className="form-container">
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
                {partners.map((thisPartner, i) => (
                  <MenuItem onClick={() => handleEditPartner(thisPartner)} key={i} value={thisPartner.id}> <em>{thisPartner.name}</em> </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id='outlined-basic'
              label='Type'
              variant='outlined'
              value={partnerType}
              onChange={(e) => setPartnerType(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />

            <TextField
              id='outlined-basic'
              label='Phone Number'
              variant='outlined'
              value={partnerPhoneNumber}
              onChange={(e) => setPartnerPhoneNumber(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <IconButton onClick={handlePartnerAdd}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handlePartnerEdit}>
              <EditIcon />
            </IconButton>


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
                {/* <MenuItem value={1}>none</MenuItem> */}
                {contacts.map((thisContact, i) => (
                  <MenuItem key={i} value={thisContact.id}> <em>{thisContact.name}</em> </MenuItem>
                ))}

              </Select>
            </FormControl>
            <TextField
              id='outlined-basic'
              label='Name'
              variant='outlined'
              value={opportunity_code}
              onChange={(e) => setOpportunityCode(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Phone Number'
              variant='outlined'
              value={name}
              onChange={(e) => setName(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Email'
              variant='outlined'
              value={name}
              onChange={(e) => setName(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <IconButton >
              <AddIcon />
            </IconButton>

            <IconButton >
              <EditIcon />
            </IconButton>

          </div>
        </div>
        <div>
          <div className="card-section">
            <h2>Opportunity Type</h2>
            <div className="form-container">
              <TextField
                id='outlined-basic'
                label='Zip'
                type="number"
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
