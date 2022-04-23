// import components here:
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// link to the autocomplete
// https://mui.com/material-ui/react-autocomplete/

import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';

function ProposalGeneralCard() {
  const proposal = useSelector(
    (store) => store.proposalReducer.singleProposalReducer,
  );
  // const partner = useSelector((store) => store.partnerReducer.partnerReducer);
  // const contact = useSelector((store) => store.contactReducer.contactReducer);

  // console.log(partner);

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_PROPOSAL', payload: id });
  }, []);

  useEffect(() => {
    // dates for inputs need to be in year-month-day format
    if (proposal.date) {
      const proposalDate = new Date(proposal.date); // get a date object of the date
      const inputProposalDate = proposalDate.toISOString().split('T')[0];

      setDate(inputProposalDate);
    }

    setProposalCode(proposal.proposal_code);
    setHouseType(proposal.house_type);
    setPlanIdentifier(proposal.plan_identifier);

    if (proposal.plan_date) {
      // get the plan date
      const planDate = new Date(proposal.plan_date);
      const inputPlanDate = planDate.toISOString().split('T')[0];

      setPlanDate(inputPlanDate);
    }

    setBuildingCode(proposal.building_code);
    setPartnerDiscount(proposal.partner_discount);
    setMethod(proposal.method || 1);
    setMethodMessage(proposal.method_message);
    setDeliveryCharge(proposal.delivery_charge);
    setDeliveryMessage(proposal.delivery_message);
    setFieldWeldCharge(proposal.field_weld_charge);
    setFieldWeldMessage(proposal.field_weld_message);
  }, [proposal]);

  const [date, setDate] = useState('');
  const [proposal_code, setProposalCode] = useState('');
  const [house_type, setHouseType] = useState('');
  const [plan_identifier, setPlanIdentifier] = useState('');
  const [plan_date, setPlanDate] = useState('');
  const [building_code, setBuildingCode] = useState('');
  const [partner_discount, setPartnerDiscount] = useState('');
  const [method, setMethod] = useState(1);
  const [method_message, setMethodMessage] = useState('');
  const [delivery_charge, setDeliveryCharge] = useState('');
  const [delivery_message, setDeliveryMessage] = useState('');
  const [field_weld_charge, setFieldWeldCharge] = useState('');
  const [field_weld_message, setFieldWeldMessage] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log('in handleSubmit', proposal);

    const proposal_date = date ? new Date(date).toISOString() : null;
    const new_plan_date = plan_date ? new Date(plan_date).toISOString() : null;

    let proposalSubmission = {
      id: proposal.id,
      date: proposal_date,
      proposal_code: proposal_code,
      house_type: house_type,
      plan_identifier: plan_identifier,
      plan_date: new_plan_date,
      building_code: building_code,
      partner_discount: partner_discount,
      method: method,
      method_message: method_message,
      delivery_charge: delivery_charge,
      delivery_message: delivery_message,
      field_weld_charge: field_weld_charge,
      field_weld_message: field_weld_message,
    };

    dispatch({ type: 'UPDATE_PROPOSAL', payload: proposalSubmission });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_PARTNER_LIST' });
  }, []);

  return (
    <>
      <div className='card-header'>
        <div className='code-container'>
          <h1>Single Proposal</h1>
          <span className='code'>
            <h3>{proposal.proposal_code}</h3>
          </span>
        </div>
        <Button onClick={handleSubmit} variant='contained' size='small'>
          Save Progress
        </Button>
      </div>
      <div className='card-body'>
        <div className='card-section'>
          <h2>General Info</h2>
          {/* GENERAL INFORMATION */}
          <div className='form-container'>
            <TextField
              id='outlined-basic'
              label='Proposal Code'
              variant='outlined'
              autoComplete='off'
              value={proposal_code}
              onChange={(e) => setProposalCode(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='date'
              label='Date Created'
              type='date'
              defaultValue='2022-04-15'
              value={date}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setDate(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='date'
              label='Plan Date'
              type='date'
              defaultValue='2022-04-15'
              value={plan_date}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setPlanDate(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Partner Discount (%)'
              type='number'
              variant='outlined'
              autoComplete='off'
              value={partner_discount}
              onChange={(e) => setPartnerDiscount(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='House Type'
              variant='outlined'
              autoComplete='off'
              value={house_type}
              onChange={(e) => setHouseType(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Plan Identifier'
              variant='outlined'
              autoComplete='off'
              value={plan_identifier}
              onChange={(e) => setPlanIdentifier(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Building Code'
              variant='outlined'
              autoComplete='off'
              value={building_code}
              onChange={(e) => setBuildingCode(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
          </div>
        </div>
        <div className='card-section'>
          <h2>Shipping & Installation</h2>
          {/* SHIPPING/INSTALLATION */}
          <div className='form-container'>
            <FormControl>
              <InputLabel id='demo-simple-select-label'>Method</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Method'
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                size='small'
                style={{ width: 200 }}
              >
                <MenuItem value={1}>Delivery Only</MenuItem>
                <MenuItem value={2}>Delivery and Install</MenuItem>
                <MenuItem value={3}>Pickup</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id='outlined-basic'
              label='Method Message'
              variant='outlined'
              autoComplete='off'
              value={method_message}
              onChange={(e) => setMethodMessage(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Delivery Charge ($)'
              type='number'
              variant='outlined'
              autoComplete='off'
              value={delivery_charge}
              onChange={(e) => setDeliveryCharge(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            {/* delivery message goes here 👇🏼 ////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <TextField
              id='outlined-basic'
              label='Delivery Message'
              variant='outlined'
              autoComplete='off'
              value={delivery_message}
              onChange={(e) => setDeliveryMessage(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            {/* delivery message goes here 👆🏼 ////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <TextField
              id='outlined-basic'
              label='Field Weld Charge ($)'
              type='number'
              variant='outlined'
              autoComplete='off'
              value={field_weld_charge}
              onChange={(e) => setFieldWeldCharge(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Field Weld Message'
              variant='outlined'
              autoComplete='off'
              value={field_weld_message}
              onChange={(e) => setFieldWeldMessage(e.target.value)}
              size='small'
              style={{ width: 200 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProposalGeneralCard;
