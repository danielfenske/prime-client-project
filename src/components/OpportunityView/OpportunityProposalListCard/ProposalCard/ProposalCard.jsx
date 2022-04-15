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
        dispatch({ type: 'FETCH_PROPOSAL', payload: { opportunity_id: opportunity_id, id: id } });
    }

    const handleDelete = () => {
        console.log('in handleDelete', id);
        dispatch({ type: 'DELETE_PROPOSAL', payload: id});
    }

    return (
        <>
            <h1>{proposal.proposal_code}</h1>
            <p>{proposal.date}</p>
            <IconButton onClick={handleEdit}><EditIcon /></IconButton>
            <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
        </>
    )
}

export default ProposalCard;