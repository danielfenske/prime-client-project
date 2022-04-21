import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../Miscellaneous/Modal/Modal';
import DeleteModal from '../../Miscellaneous/DeleteModal/DeleteModal';
import Button from '@mui/material/Button';

function OpportunityCard({ opportunity }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        console.log('you clicked Edit');
        dispatch({ type: 'FETCH_OPPORTUNITY', payload: opportunity.id })

        //  not working 👇🏼
        history.push(`/opportunity/${opportunity.id}`);
    }

    const handleDelete = () => {
        console.log('you clicked Delete');
        setOpen(false);
        dispatch({ type: 'DELETE_OPPORTUNITY', payload: opportunity.id });
    }

    return (
        <>
            <div className='list-card'>
                <div className='card-info-container'>
                    <h2>{opportunity.name}</h2>
                    <p><strong>Description: </strong>{opportunity.community_name}</p>
                    <p><strong>Due date: </strong>{new Date(opportunity.due_date).toLocaleDateString()}</p>
                </div>
                <div className='card-icon-container'>
                    <IconButton onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => { setOpen(true); }}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
            <Modal open={open} className="modal-container">
                <DeleteModal />
                <div className="modal-btn-container">
                    <Button onClick={() => { setOpen(false); }} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} variant="contained">
                        Delete
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default OpportunityCard;