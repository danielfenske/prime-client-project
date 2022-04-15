import { useDispatch, useSelector } from 'react-redux';



function OpportunityListView(){

    const dispatch = useDispatch();


    const getOpportunities = () => {
        dispatch({
            type: 'SET_OPPORTUNITY_LIST'
        })
    }







    return(
        <>
        <button onClick={getOpportunities}>Click Me</button>
        </>
    )
}


export default OpportunityListView;