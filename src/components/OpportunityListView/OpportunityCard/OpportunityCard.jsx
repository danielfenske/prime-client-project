import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './OpportunityCard.css';

function OpportunityCard({ opportunity }) {

    const dispatch = useDispatch();
    const history = useHistory();


    const handleEdit = () => {
        console.log('you clicked Edit');
        dispatch({ type: 'FETCH_OPPORTUNITY', payload: opportunity.id })

        //  not working 👇🏼
        history.push(`/opportunity/${opportunity.id}`);
    }

    const handleDelete = () => {
        console.log('you clicked Delete');
        dispatch({ type: 'DELETE_OPPORTUNITY', payload: opportunity.id });
    }

    return (
        <div className='opportunity-card'>
            <div className='info-container'>
                <div>
                    <h1>{opportunity.name}</h1>
                    <p>{new Date(opportunity.due_date).toLocaleDateString()}</p>
                </div>
                <div className='description'>
                    <p>
                        <b>Description:</b> {opportunity.community_name}
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
    )
}

export default OpportunityCard;