import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button, Select, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

import EditContactModal from './EditContactModal/EditContactModal';
import AddContactModal from './AddContactModal/AddContactModal';
import AddPartnerModal from './AddPartnerModal/AddPartnerModal';
import EditPartnerModal from './EditPartnerModal/EditPartnerModal';
// component imports
import ContactCard from './ContactCard';
import './OpportunityGeneralCard.css';

function OpportunityGeneralCard() {
  const dispatch = useDispatch();
  const partners = useSelector((store) => store.partnerReducer.partnerReducer);
  const editablePartner = useSelector(
    (store) => store.partnerReducer.partnerEditReducer,
  );
  const contacts = useSelector((store) => store.contactReducer.contactReducer);
  const editableContact = useSelector(
    (store) => store.contactReducer.contactEditReducer,
  );
  const { id } = useParams();

  const opportunity = useSelector(
    (store) => store.opportunityReducer.specificOpportunityReducer,
  );

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

    if (opportunity.partner_id) {
      handleEditPartner(
        partners.filter((p) => p.id === opportunity.partner_id)[0],
      );
      setPartnerId(opportunity.partner_id);
      // handleEditPartner(editablePartner);
    }
  }, [opportunity]);

  useEffect(() => {
    setPartnerType(editablePartner.type);
    setPartnerPhoneNumber(editablePartner.phone_number);
  }, [editablePartner]);

  useEffect(() => {
    setContactName(editableContact.name);
    setContactPhoneNumber(editableContact.phone);
    setContactEmail(editableContact.email);
  }, [editableContact]);

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
  const [partnerType, setPartnerType] = useState('');
  const [partnerPhoneNumber, setPartnerPhoneNumber] = useState('');

  // contact use states
  const [contactName, setContactName] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const [partner_id, setPartnerId] = useState(1);
  const [contact_id, setContactId] = useState(1);

  const [partnerAddModalOpen, setPartnerAddModalOpen] = useState(false);
  const [partnerEditModalOpen, setPartnerEditModalOpen] = useState(false);

  const [contactAddModalOpen, setContactAddModalOpen] = useState(false);
  const [contactEditModalOpen, setContactEditModalOpen] = useState(false);

  const handleEditContact = (thisContact) => {
    dispatch({ type: 'SET_CLEAR_EDIT_CONTACT', payload: [] });
    dispatch({ type: 'SET_EDIT_CONTACT', payload: thisContact });
  };

  const handleEditPartner = (thisPartner) => {
    dispatch({ type: 'SET_CLEAR_EDIT_PARTNER', payload: [] });
    dispatch({ type: 'SET_EDIT_PARTNER', payload: thisPartner });
  };
  const handlePartnerAdd = () => {
    setPartnerAddModalOpen(true);
  };

  const handlePartnerEdit = () => {
    setPartnerEditModalOpen(true);
  };
  const handleContactAdd = () => {
    setContactAddModalOpen(true);
  };

  const handleContactEdit = () => {
    setContactEditModalOpen(true);
  };

  const handleSubmit = () => {
    console.log('user submitted the form');
    console.log('edit partner', editablePartner);

    let opportunitySubmission = {
      partner_id: editablePartner.id,
      contact_id: editableContact.id,
      id: opportunity.id,
      name: name,
      opportunity_code: opportunity_code,
      due_date: due_date ? new Date(due_date).toISOString() : null,
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

  useEffect(() => {
    setPartnerId(editablePartner.id);
  }, [editablePartner]);

  useEffect(() => {
    setContactId(editableContact.id);
  }, [editableContact]);

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
              autoComplete='off'
              value={opportunity_code}
              onChange={(e) => setOpportunityCode(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='date'
              label='Date Created'
              type='date'
              autoComplete='off'
              defaultValue='2022-04-16'
              value={due_date}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setDueDate(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            {/* <TextField
              id='outlined-basic'
              label='Status'
              type='number'
              variant='outlined'
              autoComplete="off"
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
              label='Opportunity Type'
              variant='outlined'
              autoComplete='off'
              value={type}
              onChange={(e) => setType(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Community Name'
              variant='outlined'
              autoComplete='off'
              value={community_name ? community_name : name}
              onChange={(e) => setCommunityName(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Development Type'
              variant='outlined'
              autoComplete='off'
              value={development_type}
              onChange={(e) => setDevelopmentType(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
          </div>
        </div>
        <div className='card-section'>
          <h2>Contact Information</h2>
          <div className='form-container'>
            <div className='contact-container'>
              <FormControl>
                <InputLabel id='demo-simple-select-label'>Partner</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Partner'
                  value={partner_id}
                  onChange={(e) => setPartnerId(e.target.value)}
                  size='small'
                  style={{ width: 200 }}
                >
                  {/* <MenuItem value={1}>none</MenuItem> */}
                  {partners.map((thisPartner, i) => (
                    <MenuItem
                      onClick={() => handleEditPartner(thisPartner)}
                      key={i}
                      value={thisPartner.id}
                    >
                      {thisPartner.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div>
                <p>
                  <strong>Type:</strong>
                </p>
                <p>{partnerType ? partnerType : 'N/A'}</p>
              </div>

              <div>
                <p>
                  <strong>Phone Number:</strong>
                </p>
                {partnerPhoneNumber ? partnerPhoneNumber : <p>N/A</p>}
              </div>

              <div className='icon-container'>
                <IconButton onClick={handlePartnerEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handlePartnerAdd}>
                  <AddIcon />
                </IconButton>
              </div>
            </div>

            <div className='contact-container'>
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
                  {contacts.map((thisContact, i) => (
                    <MenuItem
                      onClick={() => handleEditContact(thisContact)}
                      key={i}
                      value={thisContact.id}
                    >
                      {thisContact.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div>
                <p>
                  <strong>Name:</strong>
                </p>
                <p>{contactName ? contactName : 'N/A'}</p>
              </div>

              <div>
                <p>
                  <strong>Phone Number:</strong>
                </p>
                <p>{contactPhoneNumber ? contactPhoneNumber : 'N/A'}</p>
              </div>

              <div>
                <p>
                  <strong>Email:</strong>
                </p>
                <p>{contactEmail ? contactEmail : 'N/A'}</p>
              </div>

              <div className='icon-container'>
                <IconButton onClick={handleContactEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleContactAdd}>
                  <AddIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='card-section'>
            <h2>Location Information</h2>
            <div className='form-container'>
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
                label='Zip (hit ENTER to autofill)'
                type='number'
                variant='outlined'
                autoComplete='off'
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
                autoComplete='off'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                size='small'
                style={{ width: 200 }}
              />
              <TextField
                id='outlined-basic'
                label='State'
                variant='outlined'
                autoComplete='off'
                value={state}
                onChange={(e) => setState(e.target.value)}
                size='small'
                style={{ width: 200 }}
              />
              <TextField
                id='outlined-basic'
                label='Tax Rate'
                type='number'
                variant='outlined'
                autoComplete='off'
                value={tax_rate}
                onChange={(e) => setTaxRate(e.target.value)}
                size='small'
                style={{ width: 200 }}
              />
            </div>
          </div>
        </div>
      </div>
      <AddPartnerModal
        open={partnerAddModalOpen}
        setOpen={setPartnerAddModalOpen}
      />
      <EditPartnerModal
        open={partnerEditModalOpen}
        setOpen={setPartnerEditModalOpen}
      />
      <AddContactModal
        open={contactAddModalOpen}
        setOpen={setContactAddModalOpen}
      />
      <EditContactModal
        open={contactEditModalOpen}
        setOpen={setContactEditModalOpen}
      />
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
