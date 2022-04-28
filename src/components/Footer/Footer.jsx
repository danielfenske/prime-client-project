import React, { useState } from 'react';
import './Footer.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CodeIcon from '@mui/icons-material/Code';
import Modal from '../Miscellaneous/Modal/Modal';
import Button from '@mui/material/Button';

function Footer() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <footer>
        <p><strong>About the Application</strong></p>
        <HelpOutlineIcon onClick={() => setOpen(true)} />
      </footer>

      <Modal open={open}>
        <div className="modal-container">
          <div className="modal-icon"><CodeIcon style={{ fontSize: 100 }} /></div>
          <h2>About the Application</h2>
          <div className="modal-form-container">
            <p>This application was designed and developed by students at Prime Digital Academy.</p>
            <div className="email-container">
              <a href="mailto: dlfenske.fenske@gmail.com">Daniel Fenske</a>
              <a href="mailto: csoudbash@gmail.com">Cameron Soudbash</a>
              <a href="mailto: davey.meuer+res@gmail.com">David Meuer</a>
              <a href="mailto: heatherkim0405@gmail.com">Heather Kim</a>
              <a href="mailto: markterrydeveloper@gmail.com">Mark Terry</a>
            </div>
          </div>
          <div className='modal-btn-container'>
            <Button onClick={() => setOpen(false)} variant='contained'>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Footer;
