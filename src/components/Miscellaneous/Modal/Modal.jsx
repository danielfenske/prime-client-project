import { Backdrop } from '@mui/material';

import './Modal.css';

function Modal({ children, open }) {
  return (
    <>
      <Backdrop open={open}>
        <div className='modal-container'>{children}</div>
      </Backdrop>
    </>
  );
}

export default Modal;
