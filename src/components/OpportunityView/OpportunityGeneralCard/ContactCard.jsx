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

import EditContactModal from './EditContactModal/EditContactModal';
import AddContactModal from './AddContactModal/AddContactModal';

function ContactCard({ contacts }) {
  const [contactSelect, setContactSelect] = useState(-1);
  const [contactInfo, setContactInfo] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleAdd = () => {
    setContactModalOpen(true);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  useEffect(() => {
    // console.log(contactSelect);
    if (contactSelect === -1) {
      setContactInfo(null);
    } else {
      setContactInfo(contacts.filter((p) => p.id == contactSelect)[0]);
    }
  }, [contactSelect]);

  return (
    <>
      <div>
        <Autocomplete
          getOptionLabel={(contact) => contact.name}
          options={contacts}
          onChange={(e, newValue) => {
            setContactSelect(newValue.id);
          }}
          renderInput={(params) => (
            <TextField {...params} label='Select Contact' size='small' />
          )}
          renderOption={(props, option) => {
            return (
              <MenuItem {...props} key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            );
          }}
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
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          )}
        </div>
      </div>
      <AddContactModal open={contactModalOpen} setOpen={setContactModalOpen} />
      <EditContactModal
        selectedContact={contactInfo}
        open={editModalOpen}
        setOpen={setEditModalOpen}
      />
    </>
  );
}

export default ContactCard;
