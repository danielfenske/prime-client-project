import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// IMPORT CHILDREN COMPONENT
import ProposalCard from './ProposalCard/ProposalCard';

function OpportunityProposalListCard() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const proposalList = useSelector((store) => store.proposalReducer.proposalListReducer);

    const postProposal = () => {
        dispatch({ type: 'POST_PROPOSAL', payload: Number(id) });
        history.push(`/proposal/${proposal.id}`);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_PROPOSAL_LIST', payload: Number(id) });
    }, [])

    return (
        <>
            <h1>Proposals</h1>
            <button onClick={postProposal}>Create New</button>

            <>
                {
                    proposalList && proposalList.map((proposal) => {
                        return (
                            <ProposalCard
                                key={proposal.id}
                                proposal={proposal}
                            />
                        )
                    })
                }
            </>
        </>
    )
}

export default OpportunityProposalListCard;