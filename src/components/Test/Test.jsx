// import components here:
import { useEffect, useState } from 'react';
import Modal from '../Miscellaneous/Modal/Modal';
import OpportunityProposalListCard from '../OpportunityView/OpportunityProposalListCard/OpportunityProposalListCard';
// link to the autocomplete
// https://mui.com/material-ui/react-autocomplete/

import { useDispatch } from 'react-redux';

function Test() {
const dispatch = useDispatch();


  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState('');

  const words = ['One', 'Two', 'Three', 'Threees'];

  return (
    <>
      {/* Place components here */}
      <OpportunityProposalListCard/> 
      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open
        </button>

        {/* input for filtering the list */}
        <input
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
        </ul>
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
