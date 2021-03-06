import './ProposalCard.css';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../../Miscellaneous/Modal/Modal';
import DeleteModal from '../../../Miscellaneous/DeleteModal/DeleteModal';
import Button from '@mui/material/Button';

import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ProposalCard({ proposal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const proposal_id = proposal.id;

  const handleEdit = () => {
    console.log('in handleEdit', id);
    dispatch({ type: 'FETCH_PROPOSAL', payload: id });
    history.push(`/proposal/${proposal_id}`);
  };

  const handleDelete = () => {
    console.log('in handleDelete', id);
    dispatch({
      type: 'DELETE_PROPOSAL',
      payload: { id: proposal_id, opportunity_id: id },
    });
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='list-card'>
        <div className='card-info-container'>
          <h2>{proposal.proposal_code}</h2>
          <p>
            <strong>House type: </strong>
            {proposal.house_type}
          </p>
          <p>
            <strong>Plan date: </strong>
            {new Date(proposal.date).toLocaleDateString()}
          </p>
        </div>
        <div className='card-icon-container'>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      <Modal open={open} className='modal-container'>
        <DeleteModal />
        <div className='modal-btn-container'>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant='outlined'
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} variant='contained'>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ProposalCard;
