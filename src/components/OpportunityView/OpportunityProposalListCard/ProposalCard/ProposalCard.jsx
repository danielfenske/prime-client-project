import './ProposalCard.css';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch } from 'react-redux';

function ProposalCard({ proposal }) {
  const dispatch = useDispatch();

  const opportunity_id = proposal.opportunity_id;
  const id = proposal.id;

  const handleEdit = () => {
    console.log('in handleEdit', id);
    dispatch({
      type: 'FETCH_PROPOSAL',
      payload: { opportunity_id: opportunity_id, id: id },
    });
  };

  const handleDelete = () => {
    console.log('in handleDelete', id);
    dispatch({ type: 'DELETE_PROPOSAL', payload: id });
  };

  console.log('Proposal', proposal);
  return (
    <div className='proposal-card'>
      <div className='info-container'>
        <div>
          <h1>{proposal.proposal_code}</h1>
          <p>{new Date(proposal.date).toLocaleDateString()}</p>
        </div>
        <div className='description'>
          <p>
            <b>Description:</b> {proposal.description}
          </p>
        </div>
      </div>
      <div className='icon-container'>
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ProposalCard;
