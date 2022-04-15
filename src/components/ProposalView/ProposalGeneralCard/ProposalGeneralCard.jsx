// import components here:
import { useEffect, useState } from 'react';

// link to the autocomplete
// https://mui.com/material-ui/react-autocomplete/

import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function ProposalGeneralCard() {

  const [date, setDate] = useState('2004-10-19T08:23:54.000Z');
  const [proposal_code, setProposalCode] = useState('');
  const [house_type, setHouseType] = useState('');
  const [plan_identifier, setPlanIdentifier] = useState('');
  const [plan_date, setPlanDate] = useState('2004-10-19T08:23:54.000Z');
  const [building_code, setBuildingCode] = useState('');
  const [partner_discount, setPartnerDiscount] = useState(0);
  const [surcharge, setSurcharge] = useState(0);
  const [surcharge_description, setSurchargeDescription] = useState('');
  const [method, setMethod] = useState(1);
  const [method_message, setMethodMessage] = useState('');
  const [delivery_charge, setDeliveryCharge] = useState(0);
  const [field_weld_charge, setFieldWeldCharge] = useState(0);
  const [field_weld_message, setFieldWeldMessage] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const postProposal = () => {
    dispatch({ type: 'POST_PROPOSAL', payload: { opportunity_id: 1 } });
  }

  const deleteProposal = () => {
    dispatch({ type: 'DELETE_PROPOSAL', payload: 23 });
  }

  const handleSubmit = () => {
    console.log('in handleSubmit');

    let proposalSubmission = {
      id: 30,
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
    }

    dispatch({ type: 'UPDATE_PROPOSAL', payload: proposalSubmission });
  }

  return (
    <>
      <button onClick={postProposal}>Create proposal</button>

      <button onClick={deleteProposal}>Delete proposal</button>

      <form onSubmit={handleSubmit}>
        {/* GENERAL INFORMATION */}
        <TextField id="outlined-basic" label="Partner Discount" type="number" variant="outlined" onChange={(e) => setPartnerDiscount(e.target.value)} />
        <TextField id="outlined-basic" label="Surcharge" type="number" variant="outlined" onChange={(e) => setSurcharge(e.target.value)} />
        <TextField id="outlined-basic" label="Surcharge Description" variant="outlined" onChange={(e) => setSurchargeDescription(e.target.value)} />
        <TextField id="date" label="Proposal Date" type="date" defaultValue="2022-04-15" InputLabelProps={{ shrink: true, }} onChange={(e) => setDate(e.target.value)} />
        <TextField id="outlined-basic" label="House Type" variant="outlined" onChange={(e) => setHouseType(e.target.value)} />
        <TextField id="outlined-basic" label="Plan Identifier" variant="outlined" onChange={(e) => setPlanIdentifier(e.target.value)} />
        <TextField id="outlined-basic" label="Building Code" variant="outlined" onChange={(e) => setBuildingCode(e.target.value)} />
        <TextField id="date" label="Plan Date" type="date" defaultValue="2022-04-15" InputLabelProps={{ shrink: true, }} onChange={(e) => setPlanDate(e.target.value)} />


        {/* SHIPPING/INSTALLATION */}
        <FormControl>
          <InputLabel id="demo-simple-select-label">Method</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <MenuItem value={1}>Delivery Only</MenuItem>
            <MenuItem value={2}>Delivery and Install</MenuItem>
            <MenuItem value={3}>Pickup</MenuItem>
          </Select>
        </FormControl>

        <TextField id="outlined-basic" label="Method Message" variant="outlined" onChange={(e) => setMethodMessage(e.target.value)} />
        <TextField id="outlined-basic" label="Delivery Charge" type="number" variant="outlined" onChange={(e) => setDeliveryCharge(e.target.value)} />
        <TextField id="outlined-basic" label="Field Weld Charge" type="number" variant="outlined" onChange={(e) => setFieldWeldCharge(e.target.value)} />
        <TextField id="outlined-basic" label="Field Weld Message" variant="outlined" onChange={(e) => setFieldWeldMessage(e.target.value)} />
        <TextField id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">Save Progress</button>
      </form>
    </>
  );
}

export default ProposalGeneralCard;
