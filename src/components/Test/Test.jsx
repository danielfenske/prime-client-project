// import components here:
import { useState } from 'react';
import Modal from '../Miscellaneous/Modal/Modal';

function Test() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Place components here */}
      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open
        </button>
      </div>

      <Modal open={open}>
        <h1>Hello World</h1>
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

export default Test;
