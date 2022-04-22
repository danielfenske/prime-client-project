// import components here:
import { useState } from 'react';

import Modal from '../../../Miscellaneous/Modal/Modal';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';

function AddContactModal({ open, setOpen }) {

  // local state for text fields when adding new contacts
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [work_phone, setWorkPhone] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('in handleSubmit');

    let contactSubmission = {
      name: name,
      email: email,
      phone: phone,
      work_phone: work_phone,
    };

    dispatch({ type: 'POST_CONTACT', payload: contactSubmission });

    setName('');
    setEmail('');
    setPhone('');
    setWorkPhone('');

    setOpen(false);
  };

  return (
    <Modal open={open}>
      <div className="modal-container">
        <div className="modal-icon"><PersonAddIcon style={{ fontSize: 100 }} /></div>
        <h2>Add New Contact</h2>
        <div className="modal-form-container">
          <TextField
            id='outlined-basic'
            label='Name'
            variant='outlined'
            value={name}
            onChange={(e) => setName(e.target.value)}
            size='small'
          />
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size='small'
          />
          <TextField
            id='outlined-basic'
            label='Phone'
            variant='outlined'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            size='small'
          />
          <TextField
            id='outlined-basic'
            label='Work Phone'
            variant='outlined'
            value={work_phone}
            onChange={(e) => setWorkPhone(e.target.value)}
            size='small'
          />
        </div>
        <div className='modal-btn-container'>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant='contained'>
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddContactModal;
