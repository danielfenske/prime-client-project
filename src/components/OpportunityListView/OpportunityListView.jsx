import { useDispatch, useSelector } from 'react-redux';
import OpportunityCard from './OpportunityCard/OpportunityCard';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function OpportunityListView() {
  const [search, setSearch] = useState('');
  const [partner, setPartner] = useState(1);
  const [status, setStatus] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_OPPORTUNITY_LIST',
    });
  }, []);

  const postOpportunity = () => {
    console.log('in postOpportunity');
    dispatch({ type: 'POST_OPPORTUNITY' });
  };

  const opportunityList = useSelector(
    (store) => store.opportunityReducer.opportunityListReducer,
  );

  return (
    <>
      <div className='card-header'>
        <h1>Opportunities</h1>
        <Button onClick={postOpportunity} variant='contained' size='small'>
          Create New
        </Button>
      </div>
      <div className="filter-container">
        <TextField
          id='outlined-basic'
          label='Search Opportunities'
          variant='outlined'
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size='small'
          style={{ width: 300 }}
        />
        <FormControl>
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
            <MenuItem value={1}>Bob</MenuItem>
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
        </FormControl>
      </div>
      <div>
        {opportunityList
          .filter((o) => {
            if (o.name === null || o.partner_id === null || o.status === null) {
              return true;
            }

            return (
              o.name.toUpperCase().includes(search.toUpperCase()) &&
              o.partner_id == partner &&
              o.status == status
            );
          })
          .map((opportunity, i) => {
            return <OpportunityCard key={i} opportunity={opportunity} />;
          })}
      </div>
    </>
  );
}

export default OpportunityListView;
