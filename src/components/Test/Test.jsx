// import components here:
import { useEffect, useState } from 'react';
import Modal from '../Miscellaneous/Modal/Modal';
import HeadingCard from '../ProposalView/ProposalOrderCard/HeadingCard/HeadingCard';
import CreateItemModal from '../ProposalView/ProposalOrderCard/CreateItemModal/CreateItemModal';
import DeleteModal from '../Miscellaneous/DeleteModal/DeleteModal';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

// link to the autocomplete
// https://mui.com/material-ui/react-autocomplete/

import { useDispatch } from 'react-redux';

function Test() {
  // const dispatch = useDispatch();


  const [open, setOpen] = useState(false);

  //   const [search, setSearch] = useState('');

  //   const words = ['One', 'Two', 'Three', 'Threees'];

  return (
    <>
      {/* Place components here */}
      {/* <CreateItemModal /> */}
      {/* <HeadingCard /> */}
      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open
        </button>

        {/* input for filtering the list */}
        {/* <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul>
          {words
            // filter the list based off the input
            .filter((e) => {
              return e.toUpperCase().includes(search.toUpperCase());
            })
            .map((word, index) => {
              return <li key={index}>{word}</li>;
            })}
        </ul> */}
      </div>


      <Modal open={open} className="modal-container">
        {/* <h1>Hello World</h1> */}
        <DeleteModal />
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Modal>

    </>
  );
}

export default Test;
