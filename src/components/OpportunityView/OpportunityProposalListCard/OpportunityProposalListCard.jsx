import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './OpportunityProposalListCard.css';

import { Button } from '@mui/material';

// IMPORT CHILDREN COMPONENT
import ProposalCard from './ProposalCard/ProposalCard';

function OpportunityProposalListCard() {
  const [search, setSearch] = useState('');
  const [partner, setPartner] = useState(1);
  const [status, setStatus] = useState(1);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const proposal = useSelector(
    (store) => store.proposalReducer.singleProposalReducer,
  );
  const proposalList = useSelector(
    (store) => store.proposalReducer.proposalListReducer,
  );
  const partners = useSelector((store) => store.partnerReducer.partnerReducer);
  const postProposal = () => {
    dispatch({ type: 'POST_PROPOSAL', payload: id });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_PROPOSAL_LIST', payload: id });
  }, []);

  return (
    <>
      <div className='card-header'>
        <h1>Proposals</h1>
        <Button onClick={postProposal} variant='contained' size='small'>
          Create New
        </Button>
      </div>
      <div className='filter-container'>
        <TextField
          id='outlined-basic'
          label='Search Proposals'
          variant='outlined'
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size='small'
          style={{ width: 300 }}
        />
        {/* NOT NEEDED FOR FILTERING */}
        {/* <FormControl>
          <InputLabel id='demo-simple-select-label'>Partner</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Partner'
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            size='small'
            style={{ width: 200 }}
          >
            {partners.map((thisPartner, i) => (
              <MenuItem key={i} value={thisPartner.id}>
                {thisPartner.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id='demo-simple-select-label'>Status</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Method'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            size='small'
            style={{ width: 200 }}
          >
            <MenuItem value={1}>In-Progress</MenuItem>
            <MenuItem value={2}>Complete</MenuItem>
            <MenuItem value={3}>Archived</MenuItem>
          </Select>
        </FormControl> */}
      </div>
      <div>
        {proposalList &&
          proposalList
            .filter((proposal) => {
              return proposal.proposal_code
                .toUpperCase()
                .includes(search.toUpperCase());
            })
            .map((proposal, index) => {
              return <ProposalCard key={index} proposal={proposal} />;
            })}
      </div>
    </>
  );
}

export default OpportunityProposalListCard;
