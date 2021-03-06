import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '../../../Miscellaneous/Modal/Modal';
import PersonIcon from '@mui/icons-material/Person';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function EditPartnerModal({ open, setOpen, opportunityId }) {
  const editablePartner = useSelector(
    (store) => store.partnerReducer.partnerEditReducer,
  );
  const editablePartnerID = useSelector(
    (store) => store.partnerReducer.partnerEditReducer.id,
  );

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [partner_code, setPartner_code] = useState('');
  const [partner_discount, setPartner_discount] = useState('');
  const [rounding_type, setRounding_type] = useState(1);
  const [phone_number, setPhone_number] = useState('');
  const [address_line_1, setAddress_line_1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  useEffect(() => {
    setName(editablePartner?.name);
    setType(editablePartner?.type);
    setPartner_code(editablePartner?.partner_code);
    setPartner_discount(editablePartner?.partner_discount);
    setRounding_type(editablePartner?.rounding_type);
    setPhone_number(editablePartner?.phone_number);
    setAddress_line_1(editablePartner?.address_line_1);
    setCity(editablePartner?.city);
    setState(editablePartner?.state);
    setZip(editablePartner?.zip);
  }, [editablePartner]);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({
      type: 'UPDATE_PARTNER',
      payload: {
        editablePartnerID,
        name,
        type,
        partner_code,
        partner_discount,
        rounding_type,
        phone_number,
        address_line_1,
        city,
        state,
        zip,
        disabled: false,
        opportunityId: opportunityId
      },
    });
    setName('');
    setType('');
    setPartner_code('');
    setPartner_discount('');
    setRounding_type('');
    setPhone_number('');
    setAddress_line_1('');
    setCity('');
    setState('');
    setZip('');

    setOpen(false);
  };

  return (
    <>
      <Modal open={open}>
        <div className='modal-container'>
          <div className='modal-icon'>
            <PersonIcon style={{ fontSize: 100 }} />
          </div>
          <h2>Update Partner</h2>
          <div className='modal-form-container'>
            <TextField
              id='outlined-basic'
              label='Name'
              value={name}
              onChange={(event) => setName(event.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Partner Type'
              value={type}
              onChange={(event) => setType(event.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Partner Code'
              value={partner_code}
              onChange={(event) => setPartner_code(event.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField // im confused as to what this is again, maybe i forgot
              id='outlined-basic'
              type='number'
              required
              label='Partner Discount'
              value={partner_discount}
              onChange={(event) => setPartner_discount(event.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <FormControl>
              <InputLabel>Rounding Type</InputLabel>
              <Select
                labelId='status-label'
                label='Rounding Type'
                variant='outlined'
                value={rounding_type}
                onChange={(e) => setRounding_type(e.target.value)}
                size='small'
                style={{ width: 200 }}
              >
                <MenuItem value={1}>None</MenuItem>
                <MenuItem value={2}>Round up one</MenuItem>
                <MenuItem value={3}>Round up five</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id='outlined-basic'
              label='Phone Number'
              value={phone_number}
              onChange={(event) => setPhone_number(event.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Address'
              value={address_line_1}
              onChange={(event) => setAddress_line_1(event.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='City'
              value={city}
              onChange={(event) => setCity(event.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField 
              id='outlined-basic'
              label='State'
              value={state}
              onChange={(event) => setState(event.target.value)}
              size='small'
              style={{ width: 200 }}
            />
            <TextField
              id='outlined-basic'
              label='Zip Code'
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              size='small'
              style={{ width: 200 }}
            />
          </div>
          <div className='modal-btn-container'>
            <Button
              variant='outlined'
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant='contained'>
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default EditPartnerModal;
