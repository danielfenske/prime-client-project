import { useDispatch, useSelector } from 'react-redux';

// IMPORT CHILDREN COMPONENT
import ProposalCard from './ProposalCard/ProposalCard';

function OpportunityProposalListCard() {

    const dispatch = useDispatch();

    const proposalList = useSelector((store) => store.proposalReducer.proposalListReducer);

    console.log(proposalList);

    const postProposal = () => {
        dispatch({ type: 'POST_PROPOSAL', payload: { opportunity_id: 1 } });
    }

    return (
        <>
            <h1>Proposals</h1>
            <button onClick={postProposal}>Create New</button>

            <>
                {
                    proposalList && proposalList.map((proposal, index) => {
                        return (
                            <ProposalCard
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