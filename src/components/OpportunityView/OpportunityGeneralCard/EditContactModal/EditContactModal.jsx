// import components here:
import { useEffect, useState } from 'react';

import Modal from '../../../Miscellaneous/Modal/Modal';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';

function EditContactModal({ selectedContact, open, setOpen }) {
  // const [open, setOpen] = useState(false);

  // local state for text fields when adding new contacts
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [work_phone, setWorkPhone] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log('in handleSubmit');

    let contactSubmission = {
      name: name,
      email: email,
      phone: phone,
      work_phone: work_phone,
      id: selectedContact.id,
    };

    dispatch({ type: 'UPDATE_CONTACT', payload: contactSubmission });

    setOpen(false);

    setName('');
    setEmail('');
    setPhone('');
    setWorkPhone('');
  };

  useEffect(() => {
    setName(selectedContact?.name);
    setEmail(selectedContact?.email);
    setPhone(selectedContact?.phone);
    setWorkPhone(selectedContact?.work_phone);
  }, [selectedContact]);

  console.log('Edit Contact Selected', selectedContact);
  return (
    <div className="modal-container">
      <div className="modal-icon"><PersonIcon style={{ fontSize: 100 }} /></div>
      <div className="modal-form-container">
        <h2>Update Contact</h2>
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
          onClick={() => {
            setOpen(false);
          }}
          variant='outlined'
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='contained'>
          Update
        </Button>
      </div>
    </div>
  );
}

export default EditContactModal;
