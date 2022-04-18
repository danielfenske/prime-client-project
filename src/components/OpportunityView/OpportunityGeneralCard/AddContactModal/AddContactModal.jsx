// import components here:
import { useState } from 'react';

import Modal from '../../../Miscellaneous/Modal/Modal';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';

function AddContactModal({ open, setOpen }) {
  // const [open, setOpen] = useState(false);

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
    <>
      <Modal open={open}>
        <h1>Add New Contact</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            id='outlined-basic'
            label='Name'
            variant='outlined'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Phone'
            variant='outlined'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Work Phone'
            variant='outlined'
            value={work_phone}
            onChange={(e) => setWorkPhone(e.target.value)}
          />
          <button type='submit'>Add</button>
        </form>

        <button
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </button>
      </Modal>
    </>
  );
}

export default AddContactModal;
