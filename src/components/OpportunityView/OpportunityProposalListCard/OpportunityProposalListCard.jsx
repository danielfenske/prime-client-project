import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './OpportunityProposalListCard.css';

import { Button } from '@mui/material';

// IMPORT CHILDREN COMPONENT
import ProposalCard from './ProposalCard/ProposalCard';

function OpportunityProposalListCard() {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const proposalList = useSelector((store) => store.proposalReducer.proposalListReducer);

  const postProposal = () => {
    dispatch({ type: 'POST_PROPOSAL', payload: Number(id) });
    history.push(`/proposal/${proposal.id}`);
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_PROPOSAL_LIST', payload: Number(id) });
  }, [])

  return (
    <>
      <div>
        <div className='proposal-list-header'>
          <h1>Proposals</h1>
          <Button onClick={postProposal} variant='contained' size='small'>
            Create New
          </Button>
        </div>
        <div>
          {proposalList &&
            proposalList.map((proposal, index) => {
              return <ProposalCard key={index} proposal={proposal} />;
            })}
        </div>
      </div>
    </>
  );
}

export default OpportunityProposalListCard;
