// import components here:
import { useEffect, useState } from 'react';
import Modal from '../Miscellaneous/Modal/Modal';

// link to the autocomplete
// https://mui.com/material-ui/react-autocomplete/

import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';


function Test() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [work_phone, setWorkPhone] = useState('');

  const dispatch = useDispatch();


  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState('');

  const words = ['One', 'Two', 'Three', 'Threees'];


  const postProposal = () => {
    dispatch({ type: 'POST_PROPOSAL', payload: { opportunity_id: 1 } });
  }

  const deleteProposal = () => {
    dispatch({type: 'DELETE_PROPOSAL', payload: 23});
  }

  const handleSubmit = () => {
    console.log('in handleSubmit');

    let contactSubmission = {
      name: name,
      email: email,
      phone: phone,
      work_phone: work_phone
    }

    dispatch({ type: 'POST_CONTACT', payload: contactSubmission });
  }

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

      <button onClick={postProposal}>Create proposal</button>

      <button onClick={deleteProposal}>Delete proposal</button>

      <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
        <TextField id="outlined-basic" label="Phone" variant="outlined" onChange={(e) => setPhone(e.target.value)} />
        <TextField id="outlined-basic" label="Work Phone" variant="outlined" onChange={(e) => setWorkPhone(e.target.value)} />
        <button type="submit">Add</button>
      </form>

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
