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
        <div className='list-card'>
            <div className='card-info-container'>
                <h1>{opportunity.name}</h1>
                <p><strong>Description: </strong>{opportunity.community_name}</p>
                <p><strong>Due date: </strong>{new Date(opportunity.due_date).toLocaleDateString()}</p>
            </div>
            <div className='card-icon-container'>
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