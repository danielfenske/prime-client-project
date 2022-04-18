import { useDispatch, useSelector } from 'react-redux';
import OpportunityCard from './OpportunityCard/OpportunityCard';
import React, { useEffect } from 'react';


function OpportunityListView() {

    useEffect(() => {
        dispatch({
            type: 'FECTCH_OPPORTUNITY_LIST'
        })
    }, [])


    const dispatch = useDispatch();

    const opportunityList = useSelector((store) => store.opportunityReducer.opportunityListReducer);
    // const proposalList = useSelector((store) => store.proposalReducer.proposalListReducer);

    const getOpportunities = () => {

        console.log(opportunityList);

    }




    return (
        <>
        {opportunityList.map((opportunity, i) => {
            return(
                <OpportunityCard key={i} opportunity={opportunity} />
            )
        })}
        </>
    )
}


export default OpportunityListView;