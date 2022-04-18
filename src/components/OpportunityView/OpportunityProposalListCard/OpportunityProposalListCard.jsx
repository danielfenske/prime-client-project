import './OpportunityProposalListCard.css';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

// IMPORT CHILDREN COMPONENT
import ProposalCard from './ProposalCard/ProposalCard';

function OpportunityProposalListCard() {
  const dispatch = useDispatch();

  const proposalList = useSelector(
    (store) => store.proposalReducer.proposalListReducer,
  );

  console.log(proposalList);

  const postProposal = () => {
    dispatch({ type: 'POST_PROPOSAL', payload: { opportunity_id: 1 } });
  };

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
