import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {
  IconButton,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from '@mui/material';

import EditContactModal from './AddContactModal/AddContactModal';
import AddContactModal from './AddContactModal/AddContactModal';

function ContactCard({ contacts }) {
  const [contactSelect, setContactSelect] = useState(-1);
  const [contactInfo, setContactInfo] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleAdd = () => {
    setContactModalOpen(true);
  };

  useEffect(() => {
    console.log(contactSelect);
    if (contactSelect === -1) {
      setContactInfo(null);
    } else {
      setContactInfo(contacts.filter((p) => p.id == contactSelect)[0]);
    }
  }, [contactSelect]);

  console.log(contactSelect);
  return (
    <>
      <div>
        {/* <Select
          value={contactSelect}
          onChange={(e) => setContactSelect(e.target.value)}
          size='small'
        >
          <MenuItem value={-1}>none</MenuItem>
          {contacts.map((partner, index) => {
            return (
              <MenuItem key={index} value={partner.id}>
                {partner.name}
              </MenuItem>
            );
          })}
        </Select> */}
        <Autocomplete
          options={contacts.map((contact, index) => {
            return { label: contact.name, id: contact.id };
          })}
          onChange={(e) => setContactSelect(e.target.value)}
          renderInput={(params) => <TextField {...params} size='small' />}
        />
        <div>
          {contactInfo && (
            <>
              <p>Name: {contactInfo?.name}</p>
              <p>Phone: {contactInfo?.phone}</p>
              <p>Work Phone: {contactInfo?.work_phone}</p>
              <p>Email: {contactInfo?.email}</p>
            </>
          )}
        </div>
        <div>
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
          {contactInfo && (
            <IconButton>
              <EditIcon />
            </IconButton>
          )}
        </div>
      </div>
      <AddContactModal open={contactModalOpen} setOpen={setContactModalOpen} />
    </>
  );
}

export default ContactCard;
