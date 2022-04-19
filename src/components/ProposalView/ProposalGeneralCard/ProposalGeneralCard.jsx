// import components here:
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProposalGeneralCard.css';

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
  const partner = useSelector((store) => store.partnerReducer.partnerReducer);

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_PROPOSAL', payload: id });
  }, []);

  useEffect(() => {
    // dates for inputs need to be in year-month-day format
    const proposalDate = new Date(proposal.date); // get a date object of the date
    const inputProposalDate = `${proposalDate.getFullYear()}-${proposalDate
      .getMonth()
      .toString()
      .padStart(2, '0')}-${proposalDate.getDay().toString().padStart(2, '0')}`; // get the year month and day as strings

    setDate(inputProposalDate);
    setProposalCode(proposal.proposal_code);
    setHouseType(proposal.house_type);
    setPlanIdentifier(proposal.plan_identifier);

    // get the plan date
    const planDate = new Date(proposal.plan_date);
    const inputPlanDate = `${planDate.getFullYear()}-${planDate
      .getMonth()
      .toString()
      .padStart(2, '0')}-${planDate.getDay().toString().padStart(2, '0')}`;

    setPlanDate(inputPlanDate);
    setBuildingCode(proposal.building_code);
    setPartnerDiscount(proposal.partner_discount);
    setSurcharge(proposal.surcharge);
    setSurchargeDescription(proposal.surcharge_description);
    setMethod(proposal.method || 1);
    setMethodMessage(proposal.method_message);
    setDeliveryCharge(proposal.delivery_charge);
    setFieldWeldCharge(proposal.field_weld_charge);
    setFieldWeldMessage(proposal.field_weld_message);
    setDescription(proposal.description);
  }, [proposal]);

  const [date, setDate] = useState('');
  const [proposal_code, setProposalCode] = useState('');
  const [house_type, setHouseType] = useState('');
  const [plan_identifier, setPlanIdentifier] = useState('');
  const [plan_date, setPlanDate] = useState('');
  const [building_code, setBuildingCode] = useState('');
  const [partner_discount, setPartnerDiscount] = useState('');
  const [surcharge, setSurcharge] = useState('');
  const [surcharge_description, setSurchargeDescription] = useState('');
  const [method, setMethod] = useState(1);
  const [method_message, setMethodMessage] = useState('');
  const [delivery_charge, setDeliveryCharge] = useState('');
  const [field_weld_charge, setFieldWeldCharge] = useState('');
  const [field_weld_message, setFieldWeldMessage] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log('in handleSubmit');

    let proposalSubmission = {
      id: proposal.id,
      date: date,
      proposal_code: proposal_code,
      house_type: house_type,
      plan_identifier: plan_identifier,
      plan_date: plan_date,
      building_code: building_code,
      partner_discount: partner_discount,
      surcharge: surcharge,
      surcharge_description: surcharge_description,
      method: method,
      method_message: method_message,
      delivery_charge: delivery_charge,
      field_weld_charge: field_weld_charge,
      field_weld_message: field_weld_message,
      description: description,
    };

    dispatch({ type: 'UPDATE_PROPOSAL', payload: proposalSubmission });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_PARTNER_LIST' });
  }, []);

  console.log('Partner', partner, 'Proposal', proposal);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='proposal-general-container'>
          <div className='partner-info'>
            <TextField
              id='outlined-basic'
              label='Partner Discount'
              type='number'
              variant='outlined'
              value={partner_discount}
              onChange={(e) => setPartnerDiscount(e.target.value)}
              size='small'
            />
          </div>
          <div className='general-info'>
            <h1>General Info</h1>
            {/* GENERAL INFORMATION */}
            <div className='inputs'>
              <TextField
                id='outlined-basic'
                label='Surcharge'
                type='number'
                variant='outlined'
                value={surcharge}
                onChange={(e) => setSurcharge(e.target.value)}
                size='small'
              />
              <TextField
                id='outlined-basic'
                label='Surcharge Description'
                variant='outlined'
                value={surcharge_description}
                onChange={(e) => setSurchargeDescription(e.target.value)}
                size='small'
              />
              <TextField
                id='date'
                label='Proposal Date'
                type='date'
                defaultValue='2022-04-15'
                value={date}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setDate(e.target.value)}
                size='small'
              />
              <TextField
                id='outlined-basic'
                label='House Type'
                variant='outlined'
                value={house_type}
                onChange={(e) => setHouseType(e.target.value)}
                size='small'
              />
              <TextField
                id='outlined-basic'
                label='Plan Identifier'
                variant='outlined'
                value={plan_identifier}
                onChange={(e) => setPlanIdentifier(e.target.value)}
                size='small'
              />
              <TextField
                id='outlined-basic'
                label='Building Code'
                variant='outlined'
                value={building_code}
                onChange={(e) => setBuildingCode(e.target.value)}
                size='small'
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
              />
            </div>
          </div>
          <div className='shipping-installation'>
            <h1>Shipping & Installation</h1>
            {/* SHIPPING/INSTALLATION */}
            <div className='inputs'>
              <FormControl>
                <InputLabel id='demo-simple-select-label'>Method</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Method'
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  size='small'
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
                value={method_message}
                onChange={(e) => setMethodMessage(e.target.value)}
                size='small'
              />
              <TextField
                id='outlined-basic'
                label='Delivery Charge'
                type='number'
                value={delivery_charge}
                variant='outlined'
                onChange={(e) => setDeliveryCharge(e.target.value)}
                size='small'
              />
              <TextField
                id='outlined-basic'
                label='Field Weld Charge'
                type='number'
                variant='outlined'
                value={field_weld_charge}
                onChange={(e) => setFieldWeldCharge(e.target.value)}
                size='small'
              />
              <TextField
                id='outlined-basic'
                label='Field Weld Message'
                variant='outlined'
                value={field_weld_message}
                onChange={(e) => setFieldWeldMessage(e.target.value)}
                size='small'
              />
              <TextField
                id='outlined-basic'
                label='Description'
                variant='outlined'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size='small'
                multiline
                rows={4}
              />
            </div>
          </div>
          <div>
            <Button type='submit' variant='contained' size='small'>
              Save Progress
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ProposalGeneralCard;
