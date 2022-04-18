import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function OpportunityCard({ opportunity }) {

    const dispatch = useDispatch();
    const history = useHistory();


    const handleEdit = () => {
        console.log('you clicked Edit');
        dispatch({
            type: 'FETCH_OPPORTUNITY',
            payload: opportunity.id
        })
        console.log(opportunity.id);
        //  not working 👇🏼
        history.push(`/api/opportunity/${opportunity.id}`);
    }

    const handleDelete = () => {
        console.log('you clicked Delete');
    }

    return (
        <>
            <h1>{opportunity.name}</h1>
            <p>{opportunity.community_name}</p>
            <p>{opportunity.city}</p>
            <p>{opportunity.state}</p>
            <p>{opportunity.id}</p>
            <IconButton onClick={handleEdit}><EditIcon /></IconButton>
            <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>

        </>
    )
}

export default OpportunityCard;