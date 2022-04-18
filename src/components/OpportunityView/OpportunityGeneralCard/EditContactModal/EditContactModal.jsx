// import components here:
import { useState } from 'react';

import Modal from '../../../Miscellaneous/Modal/Modal';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';

function EditContactModal({ selectedContact, open, setOpen }) {
  // const [open, setOpen] = useState(false);

  // local state for text fields when adding new contacts
  const [name, setName] = useState(selectedContact.name);
  const [email, setEmail] = useState(selectedContact.email);
  const [phone, setPhone] = useState(selectedContact.phone);
  const [work_phone, setWorkPhone] = useState(selectedContact.work_phone);

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

    dispatch({ type: 'POST_CONTACT', payload: contactSubmission });
  };

  return (
    <>
      <Modal open={open}>
        <h1>Edit Existing Contact</h1>
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
          Close
        </button>
      </Modal>
    </>
  );
}

export default EditContactModal;
