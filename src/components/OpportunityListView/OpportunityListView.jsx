import { useDispatch, useSelector } from 'react-redux';
import OpportunityCard from './OpportunityCard/OpportunityCard';


function OpportunityListView(){

    const dispatch = useDispatch();


    const getOpportunities = () => {
        dispatch({
            type: 'SET_OPPORTUNITY_LIST'
        })
    }







    return(
        <>
        <OpportunityCard />
        <button onClick={getOpportunities}>Click Me</button>
        </>
    )
}


export default OpportunityListView;